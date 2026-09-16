// axios 에러에서 백엔드가 보낸 메시지를 안전하게 꺼낸다. 네트워크 단절이나 타임아웃처럼
// 서버 응답 자체가 없는 실패는 e.response가 없어서, 이 가드 없이 e.response.data.msg를
// 바로 읽으면 여기서 다시 예외가 터져 에러 토스트조차 안 뜨고 조용히 실패한다.
export const getErrorMessage = (e, fallback = "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.") =>
  e?.response?.data?.msg ?? fallback;
