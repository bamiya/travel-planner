import React, { useEffect, useState } from "react";
import * as Styles from "./style";
import { MarginTopWrapper } from "../../Common/style";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import { getProfileImageUrl } from "../../utils/profileImage";
import { getErrorMessage } from "../../utils/errorMessage";
import { useConfirm } from "../../Common/ConfirmDialog";

export const EditmemberPage = () => {
  const navigate = useNavigate();
  const confirm = useConfirm();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPwConfirm, setNewPwConfirm] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showName, setShowName] = useState("");
  const [birth, setBirth] = useState("");
  const [profileImg, setProfileImg] = useState(sessionStorage.getItem("profileImg"));

  //유효성 검사
  const [isPassword, setIsPassword] = useState(true);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(true);
  const [isName, setIsName] = useState(true);
  const [isPhone, setIsPhone] = useState(true);
  //유효성 메세지
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");

  useEffect(() => {
    // 제일 처음에 실행하는 애
    getData();
  }, []);

  const getData = async () => {
    // DB에 있는 회원데이터를 불러옴
    const data = await axios.get("/getUserInfo");
    setEmail(data.data.data.email);

    setName(data.data.data.name);
    setShowName(data.data.data.name);

    setPhone(data.data.data.tel);
    setBirth(data.data.data.birth);
  };

  const update = async () => {
    // 회원 데이터를 수정 (이름, 연락처)
    if (await confirm("수정하시겠습니까?")) {
      if (isName && isPhone) {
        try {
          const data = await axios.post("/getUserUpdate", { name, tel: phone });
          getData(); // 변경된 데이터를 다시 불러오기
          toast.success(data.data.msg);
        } catch (e) {
          toast.error(getErrorMessage(e));
        }
      } else {
        toast.error("형식에 맞지 않는 값이 있습니다.");
      }
    }
  };

  const updatePw = async () => {
    //회원 데이터 수정 비밀번호
    if (await confirm("수정하시겠습니까?")) {
      if (isPassword && isPasswordConfirm) {
        try {
          const createHashedPw = CryptoJS.SHA256(pw).toString(CryptoJS.enc.Base64);
          const createHashedNewPw = CryptoJS.SHA256(newPw).toString(CryptoJS.enc.Base64);
          await axios.post("/getUserUpdatePw", { pw: createHashedPw, newPw: createHashedNewPw });
          toast.success("비밀번호 변경 성공");
        } catch (e) {
          toast.error(getErrorMessage(e));
        }
      } else {
        toast.error("형식에 맞지 않는 값이 있습니다.");
      }
    }
  };

  const userDelete = async () => {
    if (await confirm("정말로 탈퇴하시겠습니까?", { danger: true, confirmText: "탈퇴" })) {
      try {
        const data = await axios.delete("/userDelete");
        toast.success(data.data.msg);
        localStorage.clear();
        sessionStorage.clear();
        navigate("/");
      } catch (e) {
        toast.error("탈퇴 실패! 잠시 후 다시 시도해주세요.");
      }
    }
  };

  //새 비밀번호 유효성
  const onChangePassword = (e) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const passwordCurrent = e.target.value;
    setNewPw(e.target.value);
    if (passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("올바른 비밀번호 형식입니다");
      setIsPassword(true);
    } else {
      setPasswordMessage("최소한개의 영문자, 숫자 입력과 총 8자리 이상 입력해주세요.");
      setIsPassword(false);
    }
  };

  const onChangePasswordConfirm = (e) => {
    setNewPwConfirm(e.target.value);
    if (e.target.value === newPw) {
      setPasswordConfirmMessage("비밀번호가 일치합니다.");
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage("비밀번호가 서로 일치하지 않습니다.");
      setIsPasswordConfirm(false);
    }
  };

  const onChangeName = (e) => {
    setName(e.target.value);
    if (e.target.value.length >= 2 && e.target.value.length <= 4) {
      setNameMessage("올바른 이름 형식입니다");
      setIsName(true);
    } else {
      setNameMessage("2글자 이상 5글자 미만으로 입력해주세요.");
      setIsName(false);
    }
  };

  const onChangePhoneNumber = (e) => {
    const phoneRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    const phoneCurrent = e.target.value;
    setPhone(e.target.value);
    if (phoneRegex.test(phoneCurrent) && phoneCurrent.length === 11) {
      setPhoneMessage("올바른 전화번호 형식입니다.");
      setIsPhone(true);
    } else {
      setPhoneMessage("올바른 휴대폰 번호를 입력해주세요. ex) 01012345678");
      setIsPhone(false);
    }
  };

  const onSaveFiles = (e) => {
    const fileList = [];
    const uploadFiles = Array.prototype.slice.call(e.target.files); // 파일선택창에서 선택한 파일들

    uploadFiles.forEach((uploadFile) => {
      fileList.push(uploadFile);
    });

    onFileUpload(fileList);
  };

  const onFileUpload = async (fileList) => {
    const formData = new FormData();

    fileList.forEach((file) => {
      // 파일 데이터 저장
      formData.append("file", file);
    });

    try {
      const data = await axios.post("/uploadFile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const newFileName = data.data.data;
      if (newFileName) {
        sessionStorage.setItem("profileImg", newFileName);
        setProfileImg(newFileName);
      }
      toast.success("프로필 사진이 변경되었습니다.");
    } catch (e) {
      toast.error("파일 업로드에 실패했습니다.");
    }
  };

  return (
    <MarginTopWrapper margin>
      <Styles.HeroBanner>
        <Styles.HeroTitle>나의 정보 관리</Styles.HeroTitle>
        <Styles.HeroSubtitle>프로필, 연락처, 비밀번호를 관리하세요</Styles.HeroSubtitle>
      </Styles.HeroBanner>
      <Styles.ProfileBox>
        <Styles.LeftProfileBox>
          <Styles.AvatarWrap>
            <Styles.ProfileImg src={getProfileImageUrl(profileImg)} />
            <Styles.PhotoEditLabel htmlFor="ex_file">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 8a2 2 0 012-2h1.2l.7-1.4A1 1 0 018.8 4h6.4a1 1 0 01.9.6L16.8 6H18a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V8z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="2" />
              </svg>
            </Styles.PhotoEditLabel>
            <Styles.ProfileImgInput type="file" id="ex_file" accept="image/jpg, image/png, image/jpeg" onChange={onSaveFiles} />
          </Styles.AvatarWrap>
          <Styles.MemberName>{showName}</Styles.MemberName>
          <Styles.Memberemail>{email}</Styles.Memberemail>
          {birth && <Styles.Memberemail>{birth}</Styles.Memberemail>}
          <Styles.TitleBar />
          <Styles.DeleteBtn onClick={userDelete}>탈퇴하기 ▶ </Styles.DeleteBtn>
        </Styles.LeftProfileBox>

        <Styles.MyProfileBox>
          <Styles.SectionTitle>기본정보</Styles.SectionTitle>

          <Styles.BasicInforContentBox>
            <Styles.MemberEdit htmlFor="name">이름</Styles.MemberEdit>
            <Styles.Content placeholder="홍길동" onChange={(e) => onChangeName(e)} value={name || ""} />
            <Styles.WarningMessage check={isName}>{nameMessage}</Styles.WarningMessage>
          </Styles.BasicInforContentBox>

          <Styles.BasicInforContentBox>
            <Styles.MemberEdit htmlFor="phone">연락처</Styles.MemberEdit>
            <Styles.Content placeholder="01012345678" onChange={(e) => onChangePhoneNumber(e)} value={phone || ""} />
            <Styles.WarningMessage check={isPhone}>{phoneMessage}</Styles.WarningMessage>
          </Styles.BasicInforContentBox>

          <Styles.BtnBox>
            <Styles.BasicInfoBtn onClick={update}>수정하기</Styles.BasicInfoBtn>
          </Styles.BtnBox>

          <Styles.SectionDivider />

          <Styles.SectionTitle>비밀번호 변경</Styles.SectionTitle>

          <Styles.MemberContentBox>
            <Styles.MemberEdit>현재 비밀번호</Styles.MemberEdit>
            <Styles.Content type="password" placeholder="비밀번호를 입력해주세요." onChange={(e) => setPw(e.target.value)}></Styles.Content>
          </Styles.MemberContentBox>

          <Styles.MemberContentBox>
            <Styles.MemberEdit>새 비밀번호</Styles.MemberEdit>
            <Styles.Content type="password" placeholder="새 비밀번호를 입력해주세요." onChange={(e) => onChangePassword(e)}></Styles.Content>
            <Styles.WarningMessage check={isPassword}>{passwordMessage}</Styles.WarningMessage>
          </Styles.MemberContentBox>

          <Styles.MemberContentBox>
            <Styles.MemberEdit>새 비밀번호확인</Styles.MemberEdit>
            <Styles.Content type="password" placeholder="비밀번호를 다시입력해주세요." onChange={(e) => onChangePasswordConfirm(e)}></Styles.Content>
            <Styles.WarningMessage check={isPasswordConfirm}>{passwordConfirmMessage}</Styles.WarningMessage>
          </Styles.MemberContentBox>

          <Styles.BtnBox>
            <Styles.EditBtn onClick={() => updatePw()}>수정하기</Styles.EditBtn>
          </Styles.BtnBox>
        </Styles.MyProfileBox>
      </Styles.ProfileBox>
    </MarginTopWrapper>
  );
};
export default EditmemberPage;
