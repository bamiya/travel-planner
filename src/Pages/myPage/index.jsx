import React, { useEffect, useState } from "react";
import * as Styles from "./style";
import { useNavigate } from "react-router-dom";
import { MarginTopWrapper } from "../../Common/style";
import axios from "axios";

import { Nav, NavLink, NavMenu, NavLink2, NavLink3 } from "./style";

const MyPage = ({ myPlanAction, sharedPlanAction, likeAction }) => {
  const navigate = useNavigate();

  const moveEditMember = () => {
    navigate("/editMember");
  };

  useEffect(() => {
    // 제일 처음에 실행하는 애
    getData();
  }, []);

  const [name, setName] = useState("");

  const getData = async () => {
    // DB에 있는 회원데이터를 불러옴
    const data = await axios.get("http://localhost:8080/getUserInfo");
    if (!data) {
      getData();
    } else {
      setName(data.data.data.name);
    }
  };

  return (
    <MarginTopWrapper margin>
      <Styles.Box>
        <Styles.ProfileBox>
          <Styles.SettingBox>
            <Styles.MyProfileBox>
              <Styles.Profile
                src={
                  sessionStorage.getItem("profileImg")
                    ? `http://localhost:8080/image/view?value=${sessionStorage.getItem("profileImg")}`
                    : "assets/defaultProfile.png"
                }
              />
              <Styles.SettingsBtn onClick={moveEditMember}>
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M19.4 13a7.6 7.6 0 000-2l2-1.5-2-3.4-2.3.9a7.7 7.7 0 00-1.7-1l-.4-2.4H10.9l-.4 2.4a7.7 7.7 0 00-1.7 1l-2.3-.9-2 3.4L6.6 11a7.6 7.6 0 000 2l-2 1.5 2 3.4 2.3-.9a7.7 7.7 0 001.7 1l.4 2.4h2.1l.4-2.4a7.7 7.7 0 001.7-1l2.3.9 2-3.4-2-1.5z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </Styles.SettingsBtn>
            </Styles.MyProfileBox>
            <Styles.Box2>
              <Styles.Text>{name}</Styles.Text>
            </Styles.Box2>
          </Styles.SettingBox>
        </Styles.ProfileBox>

        <Nav>
          <NavMenu>
            <NavLink to="/myPlan" isaction={myPlanAction}>
              <Styles.Box1>
                <Styles.Text1>나의 플랜</Styles.Text1>
              </Styles.Box1>
            </NavLink>
          </NavMenu>
          <NavMenu>
            <NavLink2 to="/sharedPlan" isaction={sharedPlanAction}>
              <Styles.Box1>
                <Styles.Text1>공유한 플랜</Styles.Text1>
              </Styles.Box1>
            </NavLink2>
          </NavMenu>
          <NavMenu>
            <NavLink3 to="/like" isaction={likeAction}>
              <Styles.Box1>
                <Styles.Text1>좋아요 및 찜목록</Styles.Text1>
              </Styles.Box1>
            </NavLink3>
          </NavMenu>
        </Nav>
      </Styles.Box>
    </MarginTopWrapper>
  );
};

export default MyPage;
