// 한국관광공사_빅데이터_지역별 방문자수(통신사 집계) 기반 "핫플레이스" 표시용 헬퍼.
// 통신사 데이터 집계 특성상 최근 3~4주치는 아직 안 올라와 있어서, 실시간 혼잡도가
// 아니라 "최근 몇 주 전 기준으로 이 동네가 평소 얼마나 붐비는 동네인지"를 보여준다.

// TourAPI 응답의 lDongRegnCd(시도 법정동코드)+lDongSignguCd(시군구 법정동코드 뒤 3자리)를
// 그대로 조합해서 이 API의 signguCode(5자리)를 만든다 - 연관관광지 API 때와 동일한 방식.
export const fetchVisitorDemand = async (lDongRegnCd, lDongSignguCd) => {
  if (!lDongRegnCd || !lDongSignguCd) return null;
  const signguCode = `${lDongRegnCd}${lDongSignguCd}`;

  const pad = (n) => String(n).padStart(2, "0");
  const fmt = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const today = new Date();
  const end = new Date(today);
  end.setDate(end.getDate() - 18); // 최근 데이터는 아직 안 올라와 있어서 여유를 둔다
  const start = new Date(today);
  start.setDate(start.getDate() - 35);

  try {
    const response = await fetch(
      `https://apis.data.go.kr/B551011/DataLabService/locgoRegnVisitrDDList?serviceKey=${process.env.VITE_TOUR_API_KEY}&numOfRows=10000&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&startYmd=${fmt(start)}&endYmd=${fmt(end)}`
    );
    const json = await response.json();
    const raw = json.response?.body?.items?.item;
    const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
    const matches = list.filter((it) => it.signguCode === signguCode);
    if (matches.length === 0) return null;

    const latestYmd = matches.reduce((max, it) => (it.baseYmd > max ? it.baseYmd : max), "");
    const latest = matches.filter((it) => it.baseYmd === latestYmd);
    const local = latest.find((it) => it.touDivCd === "1");
    const visitor = latest.find((it) => it.touDivCd === "2");

    return {
      date: latestYmd,
      local: local ? Math.round(Number(local.touNum)) : null,
      visitor: visitor ? Math.round(Number(visitor.touNum)) : null,
    };
  } catch (e) {
    // 무료 공공데이터 API라 실패해도 조용히 무시한다.
    return null;
  }
};

// 전국 시군구 외지인 방문자수 분포(중앙값 약 11만, 상위 10% 약 26만, 최댓값 약 69만 -
// 2026년 8월 기준 실측)를 참고해 대략 잡은 등급. 절대적인 "정답" 기준은 아니고,
// 핫플레이스 표시를 위한 대략적인 감이다.
export const getHeatTier = (visitorCount) => {
  if (visitorCount == null) return null;
  if (visitorCount >= 300000) return { icon: "🔥🔥🔥", label: "핫플레이스" };
  if (visitorCount >= 150000) return { icon: "🔥🔥", label: "인기 지역" };
  if (visitorCount >= 60000) return { icon: "🔥", label: "방문자 있음" };
  return null;
};
