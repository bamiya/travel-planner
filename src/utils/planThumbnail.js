// 플랜의 첫 대표 이미지를 안전하게 꺼낸다. 관광지를 하나도 안 넣은 채로 저장된 플랜은
// plan[0].list가 빈 배열이라, 그대로 list[0]에 접근하면 페이지 전체가 죽는다.
// 날짜 순서대로 뒤져서 실제로 존재하는 첫 장소를 찾는다.
export const getPlanThumbnail = (planJson, fields = "firstimage2", fallback = "assets/logo.png") => {
  const days = JSON.parse(planJson);
  const firstStop = days.flatMap((day) => day.list)[0];
  if (!firstStop) return fallback;
  const fieldList = Array.isArray(fields) ? fields : [fields];
  return fieldList.map((f) => firstStop[f]).find((v) => v) ?? fallback;
};
