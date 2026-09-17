// OSRM(Project OSRM) 공개 데모 서버로 실제 도로/경로 기준 거리·소요시간을 구한다.
// 직선거리 추정은 산/강처럼 우회가 필요한 구간에서 시간을 심하게 과소평가하는
// 문제가 있어서, 실제 경로 기반으로 바꿨다.
//
// 주의: router.project-osrm.org는 "비영리, 초당 1건 이하"로만 쓰라는 공식 정책의
// 무료 데모 서버다. 지금은 개발/검증 단계라 그대로 쓰지만, 광고 기반으로 실제
// 서비스를 오픈하기 전에는 자체 호스팅 OSRM(오픈소스, 서버비만 듦)으로 바꾸거나
// 사용량 정책을 다시 확인해야 한다.
const OSRM_BASE = "https://router.project-osrm.org/route/v1";
const MIN_INTERVAL_MS = 1100; // 데모서버 정책: 초당 1건 이하

let lastRequestAt = 0;
const throttle = async () => {
  const wait = lastRequestAt + MIN_INTERVAL_MS - Date.now();
  if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
  lastRequestAt = Date.now();
};

// mode: "walk" | "car". includeGeometry가 true면 지도에 실제 도로를 따라가는
// 경로선을 그릴 수 있도록 좌표 배열([lat,lon])도 같이 반환한다.
// 실패/타임아웃이면 null - 호출부에서 직선거리로 폴백한다.
export const fetchRouteInfo = async (lat1, lon1, lat2, lon2, mode, includeGeometry = false) => {
  const profile = mode === "walk" ? "foot" : "driving";
  const params = includeGeometry ? "overview=full&geometries=geojson" : "overview=false";
  try {
    await throttle();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`${OSRM_BASE}/${profile}/${lon1},${lat1};${lon2},${lat2}?${params}`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) return null;
    const json = await res.json();
    const route = json.routes?.[0];
    if (!route) return null;
    const result = { meters: route.distance, minutes: Math.max(1, Math.round(route.duration / 60)) };
    if (includeGeometry && route.geometry?.coordinates) {
      // OSRM geojson 좌표는 [lon,lat] 순서라 naverMap이 기대하는 [lat,lon]으로 뒤집는다.
      result.coordinates = route.geometry.coordinates.map(([lon, lat]) => [lat, lon]);
    }
    return result;
  } catch (e) {
    return null;
  }
};
