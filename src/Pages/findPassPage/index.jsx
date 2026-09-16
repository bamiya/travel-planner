import React, { useState } from "react";
import * as Styles from "./style";
import { UserBlueBtn } from "../../Common/style";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const FindPassPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState("email"); // "email" -> "code"

  const sendCode = async () => {
    try {
      await axios.post("/sendResetCode", { email });
      setStep("code");
    } catch (e) {
      toast.error(e.response.data.msg);
    }
  };

  const verifyCode = async () => {
    try {
      const result = await axios.post("/verifyResetCode", { email, code });
      navigate("/changePass", { state: result.data.data.resetToken });
    } catch (e) {
      toast.error(e.response.data.msg);
    }
  };

  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      step === "email" ? sendCode() : verifyCode();
    }
  };

  return (
    <Styles.Wrapper>
      <Styles.AuthCard>
        <Styles.ContentBox>
          <Styles.LoginText>비밀번호 찾기</Styles.LoginText>

          {step === "email" ? (
            <>
              <Styles.LoginText2>
                이메일
                <Styles.Input placeholder="이메일을 입력하세요" onChange={(e) => setEmail(e.target.value)} onKeyPress={onKeyPress}></Styles.Input>
              </Styles.LoginText2>
              <UserBlueBtn onClick={sendCode}>인증코드 받기</UserBlueBtn>
            </>
          ) : (
            <>
              <Styles.LoginText2>
                인증코드
                <Styles.Input placeholder="이메일로 받은 인증코드를 입력하세요" onChange={(e) => setCode(e.target.value)} onKeyPress={onKeyPress}></Styles.Input>
              </Styles.LoginText2>
              <UserBlueBtn onClick={verifyCode}>인증코드 확인</UserBlueBtn>
            </>
          )}
        </Styles.ContentBox>
      </Styles.AuthCard>
    </Styles.Wrapper>
  );
};

export default FindPassPage;
