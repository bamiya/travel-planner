import axios from "axios";

// 메인 지역 불러오는 함수
export const getAddressData = async () => {
  const data = await axios.get("https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=***00000");
  return data.data.regcodes;
};

// 리프레쉬를 통해 액세스 토큰 다시 발급.
// 리프레시 토큰 자체는 httpOnly 쿠키로 오가서 여기서 다룰 필요가 없다 - 브라우저가
// withCredentials 요청에 자동으로 실어 보내고, 백엔드가 회전(rotation)된 새 토큰을
// Set-Cookie로 다시 내려준다.
export const getAccessToken = async () => {
  const data = await axios.post("/getTokenUsedRefreshToken");
  sessionStorage.setItem("access_token", data.data.data.access_token);
  if (data.data.data.profileImg) {
    sessionStorage.setItem("profileImg", data.data.data.profileImg);
  }
};
