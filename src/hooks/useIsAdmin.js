import { useEffect, useState } from "react";
import axios from "axios";

// 공지사항 작성/댓글 삭제처럼 관리자 전용 버튼을 보여줄지 판단할 때 쓴다.
// /getUserInfo는 로그인한 본인 정보(Owner 뷰)라 role이 포함돼 있다 - 비로그인이면
// 401이 나는 게 정상이라 그냥 isAdmin: false로 조용히 처리한다.
export const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("access_token")) return;
    axios
      .get("/getUserInfo")
      .then((res) => setIsAdmin(res.data.data.role === "ADMIN"))
      .catch(() => setIsAdmin(false));
  }, []);

  return isAdmin;
};
