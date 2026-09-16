import React, { useEffect, useState } from "react";
import * as Styles from "./style";
import { UserBlueBtn } from "../../Common/style";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import { getErrorMessage } from "../../utils/errorMessage";

const KAKAO_CLIENT_ID = "0a61f9efbdac3933e6a14ed6f553bd00";
const KAKAO_REDIRECT_URI = "http://localhost:3000/login";
const KAKAO_OAUTH_STATE_KEY = "kakao_oauth_state";

// CSRF 방지용 state 값 생성 (공격자가 자기 코드로 남의 브라우저에 로그인 요청을 흘려넣는 것을 막음)
const generateOAuthState = () => {
  const bytes = new Uint8Array(16);
  window.crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const kakaoLogin = () => {
    const state = generateOAuthState();
    sessionStorage.setItem(KAKAO_OAUTH_STATE_KEY, state);
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&state=${state}`;
  };

  const getToken = async () => {
    // 인증코드(code)만 백엔드로 전달한다. code→액세스토큰 교환은 client_secret이 필요한
    // 단계라 백엔드(서버 사이드)에서 처리한다 - 비밀키를 프론트 번들에 노출하지 않기 위함.
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    if (code !== null) {
      const expectedState = sessionStorage.getItem(KAKAO_OAUTH_STATE_KEY);
      sessionStorage.removeItem(KAKAO_OAUTH_STATE_KEY);
      if (!expectedState || state !== expectedState) {
        toast.error("잘못된 접근입니다. 다시 로그인해주세요.");
        navigate("/login");
        return;
      }
      try {
        const userInfo = await axios.get("/kakaoLogin", { params: { code } });
        if (userInfo.status === 200) {
          if (userInfo.data.data.isUser === "N") {
            // 현재 DB에 회원이 없음
            navigate("/sign", { state: { email: userInfo.data.data.email } });
          } else if (userInfo.data.data.isUser === "Y") {
            // 현재 DB에 회원이 있음
            sessionStorage.setItem("access_token", userInfo.data.data.access_token);
            localStorage.setItem("refresh_token", userInfo.data.data.refresh_token);
            sessionStorage.setItem("profileImg", userInfo.data.data.profileImg);
            navigate("/");
          }
        }
      } catch (e) {
        toast.error("알 수 없는 오류! 나중에 다시 시도해주세요.");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  // 액세스 토큰은 세션 스토리지
  // 리프레시 토큰은 로컬 스토리지
  const onLogin = async () => {
    let data = null;
    const createHashedPassword = CryptoJS.SHA256(pw).toString(CryptoJS.enc.Base64);
    

    try {
      data = await axios.post("/login", { email, pw: createHashedPassword });
      sessionStorage.setItem("access_token", data.data.data.access_token);
      sessionStorage.setItem("profileImg", data.data.data.profileImg);
      localStorage.setItem("refresh_token", data.data.data.refresh_token);
      navigate("/");
    } catch (e) {
      toast.error(getErrorMessage(e));
      navigate("/login");
    }
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onLogin();
    }
  };

  return (
    <Styles.Wrapper>
      <Styles.AuthCard>
        <Styles.ContentBox>
          <Styles.LoginText>LOGIN</Styles.LoginText>

          <Styles.LoginText2>
            이메일
            <Styles.Input placeholder="이메일을 입력하세요" onChange={(e) => setEmail(e.target.value)} />
          </Styles.LoginText2>

          <Styles.LoginText2 htmlFor="pw">
            비밀번호
            <Styles.Input type="password" placeholder="비밀번호를 입력하세요" onChange={(e) => setPw(e.target.value)} onKeyPress={onKeyPress} />
          </Styles.LoginText2>

          <UserBlueBtn onClick={onLogin}>로그인</UserBlueBtn>
          <Styles.KakaoBtn onClick={kakaoLogin}>카카오 로그인</Styles.KakaoBtn>

          <Styles.OrDivider>OR</Styles.OrDivider>

          <Styles.FindSignWrap>
            <Styles.FindSignText onClick={() => navigate("/findPass")}>비밀번호 찾기</Styles.FindSignText>
            <div> │ </div>
            <Styles.FindSignText onClick={() => navigate("/sign")}>회원가입</Styles.FindSignText>
          </Styles.FindSignWrap>
        </Styles.ContentBox>
      </Styles.AuthCard>
    </Styles.Wrapper>
  );
};

export default LoginPage;
