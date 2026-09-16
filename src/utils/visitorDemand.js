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

// fetchVisitorDemand과 동일한 데이터를 한 번의 호출로 모든 시군구에 대해 가져와
// signguCode → {date, local, visitor} 맵으로 정리한다. 목록 화면처럼 여러 지역의
// 데이터가 한꺼번에 필요할 때, 지역마다 API를 따로 호출하지 않기 위한 용도.
export const fetchVisitorDemandMap = async () => {
  const pad = (n) => String(n).padStart(2, "0");
  const fmt = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const today = new Date();
  const end = new Date(today);
  end.setDate(end.getDate() - 18);
  const start = new Date(today);
  start.setDate(start.getDate() - 35);

  try {
    const response = await fetch(
      `https://apis.data.go.kr/B551011/DataLabService/locgoRegnVisitrDDList?serviceKey=${process.env.VITE_TOUR_API_KEY}&numOfRows=10000&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&startYmd=${fmt(start)}&endYmd=${fmt(end)}`
    );
    const json = await response.json();
    const raw = json.response?.body?.items?.item;
    const list = Array.isArray(raw) ? raw : raw ? [raw] : [];

    const latestYmdBySignguCode = new Map();
    list.forEach((it) => {
      const current = latestYmdBySignguCode.get(it.signguCode);
      if (!current || it.baseYmd > current) {
        latestYmdBySignguCode.set(it.signguCode, it.baseYmd);
      }
    });

    const map = new Map();
    list.forEach((it) => {
      if (it.baseYmd !== latestYmdBySignguCode.get(it.signguCode)) return;
      const entry = map.get(it.signguCode) ?? { date: it.baseYmd, local: null, visitor: null };
      if (it.touDivCd === "1") entry.local = Math.round(Number(it.touNum));
      if (it.touDivCd === "2") entry.visitor = Math.round(Number(it.touNum));
      map.set(it.signguCode, entry);
    });
    return map;
  } catch (e) {
    // 무료 공공데이터 API라 실패해도 조용히 무시한다.
    return new Map();
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
