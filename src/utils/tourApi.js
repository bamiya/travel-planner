export const getTourDetailUrl = (contentId) =>
  `https://apis.data.go.kr/B551011/KorService2/detailCommon2?serviceKey=${process.env.VITE_TOUR_API_KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${contentId}`;
