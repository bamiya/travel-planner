import React, { useState, useEffect } from "react";
import * as Styles from "./style";
import { useNavigate, useLocation } from "react-router-dom";
import { MarginTopWrapper } from "../../Common/style";
import { toast } from "react-toastify";
import axios from "axios";
import { getProfileImageUrl } from "../../utils/profileImage";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpenList, setIsOpenList] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0); // 스크롤 초기값0으로 주고 스크롤이 100px내려갈때부터 백그라운드색상 변경할때 사용

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const logout = async () => {
    // 탈취된 리프레시 토큰이 로그아웃 후에도 계속 쓰일 수 있는 걸 막으려면 서버에도
    // 폐기를 알려야 한다 - 리프레시 토큰은 httpOnly 쿠키라 요청에 자동으로 실린다.
    // 실패해도(네트워크 문제 등) 로컬 로그아웃 자체는 계속 진행한다.
    try {
      await axios.post("/logout");
    } catch (e) {
      // 무시 - 어차피 로컬 토큰은 지운다
    }
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const goCreatePlanPage = () => {
    toast.info("로그인 후 이용해 주세요.");
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  return (
    <Styles.Wrapper bg={location.pathname === "/" ? true : false} scroll={scrollPosition > 100 ? true : false}>
      <MarginTopWrapper>
        <Styles.Header>
          <Styles.LogoArea>
            <Styles.Img
              src={"assets/logo.png"}
              alt="logo"
              onClick={() => {
                navigate("/");
                setIsMobileMenuOpen(false);
              }}
            />
          </Styles.LogoArea>

          <Styles.HamburgerBtn aria-label="메뉴 열기" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Styles.HamburgerBar open={isMobileMenuOpen} />
          </Styles.HamburgerBtn>

          <Styles.NavArea open={isMobileMenuOpen}>
            <Styles.Menu>
              <Styles.Text
                onClick={() => {
                  navigate("/travel");
                  setIsMobileMenuOpen(false);
                }}>
                여행지
              </Styles.Text>
              {!sessionStorage.getItem("access_token") ? (
                <>
                  <Styles.Text onClick={goCreatePlanPage}>플랜 생성</Styles.Text>
                </>
              ) : (
                <>
                  <Styles.Text
                    onClick={() => {
                      navigate("/CreatePlanPage");
                      setIsMobileMenuOpen(false);
                    }}>
                    플랜 생성
                  </Styles.Text>
                </>
              )}
              <Styles.Text
                onClick={() => {
                  navigate("/shared");
                  setIsMobileMenuOpen(false);
                }}>
                공유된 플랜 보기
              </Styles.Text>
            </Styles.Menu>
            <Styles.LogSign>
              {!sessionStorage.getItem("access_token") ? (
                <>
                  <Styles.Text
                    onClick={() => {
                      navigate("/login");
                      setIsMobileMenuOpen(false);
                    }}>
                    로그인
                  </Styles.Text>
                  <Styles.Text
                    onClick={() => {
                      navigate("/sign");
                      setIsMobileMenuOpen(false);
                    }}>
                    회원가입
                  </Styles.Text>
                </>
              ) : (
                <>
                  <Styles.MyProfile onClick={() => setIsOpenList(!isOpenList)}>
                    <Styles.MyProfileImg src={getProfileImageUrl(sessionStorage.getItem("profileImg"))} />
                    <Styles.MyProfileListBox clicked={isOpenList}>
                      <Styles.MyProfileItem onClick={() => navigate("/myPlan")}>MY PAGE</Styles.MyProfileItem>
                      <Styles.MyProfileItem last onClick={logout}>
                        LOGOUT
                      </Styles.MyProfileItem>
                    </Styles.MyProfileListBox>
                  </Styles.MyProfile>
                </>
              )}
            </Styles.LogSign>
          </Styles.NavArea>
        </Styles.Header>
      </MarginTopWrapper>
    </Styles.Wrapper>
  );
};

export default Header;
