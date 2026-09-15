/* global naver */

// 검색어가 관광지/음식점 "이름"과 정확히 일치하지 않으면 TourAPI(searchKeyword2)가
// 결과를 0건으로 준다 (예: "용산역"처럼 지하철역/지명 이름). 이럴 때 네이버맵의
// 지오코더로 그 지명의 좌표를 구한 뒤, 그 주변을 반경 검색(locationBasedList2)해서
// "근처" 결과라도 보여주기 위한 헬퍼.

// 키워드를 좌표로 변환한다. 실패하면 null.
export const geocodeKeyword = (keyword) => {
  return new Promise((resolve) => {
    if (typeof naver === "undefined" || !naver.maps || !naver.maps.Service) {
      resolve(null);
      return;
    }
    naver.maps.Service.geocode({ query: keyword }, (status, response) => {
      if (status !== naver.maps.Service.Status.OK) {
        resolve(null);
        return;
      }
      const addresses = response?.v2?.addresses;
      if (!addresses || addresses.length === 0) {
        resolve(null);
        return;
      }
      resolve({ lat: addresses[0].y, lon: addresses[0].x });
    });
  });
};

// 좌표 주변을 반경검색으로 가져온다. contentType을 안 주면 관광지/음식점/숙박 등
// 전체 카테고리를 거리순으로 섞어서 준다 (tourInfoPage의 "주변 추천"과 동일한 방식).
export const fetchNearbyTours = async (lat, lon, contentType, radius = 2000) => {
  const contentTypeParam = contentType ? `&contentTypeId=${contentType}` : "";
  const response = await fetch(
    `https://apis.data.go.kr/B551011/KorService2/locationBasedList2?serviceKey=${process.env.VITE_TOUR_API_KEY}&numOfRows=100000&MobileOS=ETC&MobileApp=AppTest&_type=json&mapX=${lon}&mapY=${lat}&radius=${radius}&arrange=E${contentTypeParam}`
  );
  const json = await response.json();
  return json.response?.body?.items?.item ?? [];
};

// searchKeyword2가 0건일 때 쓰는 통합 fallback: 지오코딩 성공 시 주변 결과를,
// 실패하면 빈 배열을 돌려준다.
export const searchNearbyFallback = async (keyword, contentType) => {
  const coord = await geocodeKeyword(keyword);
  if (!coord) return { items: [], usedFallback: false };
  const items = await fetchNearbyTours(coord.lat, coord.lon, contentType);
  return { items, usedFallback: true };
};
