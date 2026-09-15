import { geocodeKeyword, fetchNearbyTours } from "./nearbySearch";

// TourAPI에는 별점/리뷰 같은 "품질" 지표가 없어서, 진짜 AI 추천을 흉내내는 대신
// 규칙 기반으로 그럴듯한 일정을 짜주는 자동 플래너.
// 1) 목적지 좌표를 구하고 2) 그 주변 관광지/음식점 후보를 모아서
// 3) 날짜 수만큼 지리적으로 묶고 4) 하루 안에서는 가까운 순서로 정렬한다.

const ATTRACTIONS_PER_DAY = 3;
const KM = 1000;

const toRad = (deg) => (deg * Math.PI) / 180;

// 두 좌표 사이 거리(km). 인자는 TourAPI가 주는 mapx(lon)/mapy(lat) 문자열이어도 된다.
const haversineKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const dist = (a, b) => haversineKm(Number(a.mapy), Number(a.mapx), Number(b.mapy), Number(b.mapx));

// 후보 중 firstimage가 있는 곳을 우선한다 - TourAPI에 사진이 등록돼 있다는 건
// 그만큼 정보가 잘 정리된, 덜 부실한 장소일 확률이 높다는 간단한 품질 필터.
const rankCandidates = (items) => {
  const withImage = items.filter((it) => it.firstimage);
  const withoutImage = items.filter((it) => !it.firstimage);
  return [...withImage, ...withoutImage];
};

// numDays개의 중심점을 최대한 멀리 떨어뜨려 뽑는다 (farthest-point sampling).
// 이렇게 뽑은 중심점을 기준으로 나머지 후보를 묶으면 "하루 안에 도시 반대편까지
// 왔다갔다 하는" 동선을 어느 정도 피할 수 있다.
const pickSeeds = (candidates, numDays) => {
  const seeds = [candidates[0]];
  while (seeds.length < numDays && seeds.length < candidates.length) {
    let farthest = null;
    let farthestDist = -1;
    for (const c of candidates) {
      if (seeds.includes(c)) continue;
      const minDistToSeeds = Math.min(...seeds.map((s) => dist(c, s)));
      if (minDistToSeeds > farthestDist) {
        farthestDist = minDistToSeeds;
        farthest = c;
      }
    }
    if (!farthest) break;
    seeds.push(farthest);
  }
  return seeds;
};

// 나머지 후보를 가장 가까운 seed(=하루)에 배정한다. 하루 정원이 차면 다음으로 가까운
// 날짜로 넘긴다.
const clusterByDay = (candidates, seeds, perDay) => {
  const days = seeds.map((seed) => [seed]);
  const rest = candidates.filter((c) => !seeds.includes(c));
  for (const c of rest) {
    const order = days
      .map((day, i) => ({ i, d: Math.min(...day.map((p) => dist(c, p))) }))
      .sort((a, b) => a.d - b.d);
    const target = order.find((o) => days[o.i].length < perDay);
    if (target) days[target.i].push(c);
  }
  return days;
};

// 하루 안에서는 가까운 곳부터 차례로 도는 순서로 정렬 (nearest-neighbor 그리디).
const orderByNearestNeighbor = (stops) => {
  if (stops.length <= 2) return stops;
  const remaining = [...stops];
  const route = [remaining.shift()];
  while (remaining.length > 0) {
    const last = route[route.length - 1];
    let nearestIdx = 0;
    let nearestDist = Infinity;
    remaining.forEach((s, i) => {
      const d = dist(last, s);
      if (d < nearestDist) {
        nearestDist = d;
        nearestIdx = i;
      }
    });
    route.push(remaining.splice(nearestIdx, 1)[0]);
  }
  return route;
};

// keyword(예: "부산", "제주", "강릉역") 주변으로 numDays일치 일정을 자동으로 짠다.
// 성공하면 dayList와 같은 모양([[1, [stop,...]], [2, [...]], ...])을 돌려주고,
// 목적지를 좌표로 바꿀 수 없으면 null을 돌려준다.
export const generateAutoPlan = async ({ keyword, numDays }) => {
  let center = await geocodeKeyword(keyword);

  if (!center) {
    // 지오코딩은 "행정구역 주소"만 처리해서 역/랜드마크 이름은 실패할 수 있다.
    // 이럴 땐 TourAPI 자체 검색 결과의 좌표를 대신 앵커로 쓴다.
    const response = await fetch(
      `https://apis.data.go.kr/B551011/KorService2/searchKeyword2?serviceKey=${process.env.VITE_TOUR_API_KEY}&numOfRows=1&MobileOS=ETC&MobileApp=AppTest&_type=json&contentTypeId=12&keyword=${encodeURIComponent(keyword)}`
    );
    const json = await response.json();
    const first = json.response?.body?.items?.item?.[0];
    if (first) center = { lat: first.mapy, lon: first.mapx };
  }

  if (!center) return null;

  const perDay = ATTRACTIONS_PER_DAY;
  const [attractionsRaw, restaurantsRaw] = await Promise.all([
    fetchNearbyTours(center.lat, center.lon, 12, 20 * KM),
    fetchNearbyTours(center.lat, center.lon, 39, 20 * KM),
  ]);

  const attractions = rankCandidates(attractionsRaw).slice(0, Math.max(numDays * perDay * 2, 20));
  if (attractions.length === 0) return null;

  const seeds = pickSeeds(attractions, numDays);
  const dayGroups = clusterByDay(attractions, seeds, perDay);

  const usedIds = new Set();
  const dayList = dayGroups.map((group, i) => {
    const centroid = {
      mapy: group.reduce((sum, p) => sum + Number(p.mapy), 0) / group.length,
      mapx: group.reduce((sum, p) => sum + Number(p.mapx), 0) / group.length,
    };
    const nearbyRestaurants = restaurantsRaw
      .filter((r) => !usedIds.has(r.contentid))
      .sort((a, b) => dist(centroid, a) - dist(centroid, b));
    const restaurant = rankCandidates(nearbyRestaurants)[0];

    const stops = [...group];
    if (restaurant) {
      stops.push(restaurant);
      usedIds.add(restaurant.contentid);
    }
    group.forEach((s) => usedIds.add(s.contentid));

    return [i + 1, orderByNearestNeighbor(stops)];
  });

  return dayList;
};
