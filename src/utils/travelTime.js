// 두 지점 사이의 직선거리(m)로부터 이동수단/소요시간을 추정한다.
// 실제 도로/대중교통 경로가 아닌 직선거리 기반 추정치 - 라벨에 "추정"을 명시해서 사용한다.
export const estimateTravelTime = (distanceMeters) => {
  if (!Number.isFinite(distanceMeters)) return null;
  if (distanceMeters < 1000) {
    const minutes = Math.max(1, Math.round(distanceMeters / 67)); // 도보 평균 약 4km/h
    return { mode: "walk", minutes };
  }
  const minutes = Math.max(1, Math.round(distanceMeters / 500)); // 도심 차량 평균 약 30km/h
  return { mode: "car", minutes };
};
