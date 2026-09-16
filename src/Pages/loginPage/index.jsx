import React, { useEffect, useState } from "react";
import * as Styles from "./style";
import { UserBlueBtn } from "../../Common/style";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";

const KAKAO_CLIENT_ID = "0a61f9efbdac3933e6a14ed6f553bd00";
const KAKAO_REDIRECT_URI = "http://localhost:3000/login";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const kakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  };

  const getToken = async () => {
    const code = new URL(window.location.href).searchParams.get("code");
    const params = {
      client_id: KAKAO_CLIENT_ID,
      redirect_uri: KAKAO_REDIRECT_URI,
      client_secret: "K2uqygqk3ddG8UFgrIFdE76bKg9SpEwT",
      code: code,
      grant_type: "authorization_code",
    };
    if (code !== null) {
      try {
        const token = await axios.get("https://kauth.kakao.com/oauth/token", {
          params: params,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        const userInfo = await axios.get("/kakaoLogin", { params: { token: token.data.access_token } });
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
      toast.error(e.response.data.msg);
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
