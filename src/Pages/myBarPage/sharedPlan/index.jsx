import React, { useEffect, useState } from "react";
import * as Styles from "./style";
import MyPage from "../../myPage";
import { MarginTopWrapper } from "../../../Common/style";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../../../Common/Spinner";

const SharedPlan = () => {
  const navigate = useNavigate();
  const [plan, setPlan] = useState();


  useEffect(() => {
    getUserPlan();
  }, []);

  const getUserPlan = async () => {
    // DB에 있는 플랜데이터
    try {
      const data = await axios.get("http://localhost:8080/getShareMyPlan");
      setPlan(Object.entries(data.data.data));
    } catch (e) {
      setPlan([]);
    }
  };

  const onShareBtn = async () => {
    if (window.confirm("공유취소하시겠습니까?")) {
      try {
        await axios.put("http://localhost:8080/updateSharePlan", { id: plan[0][1].id });
        getUserPlan();
      } catch (e) {
        toast.error("공유 버튼 에러");
      }
    }
  };
  const infoMove = (e) => {
    navigate(`/calendar?id=${e[1].id}`);
  };
  return (
    <>
      <MyPage sharedPlanAction="sharedPlan" />
      <MarginTopWrapper>
        <Styles.BigBox>
          <Styles.Box>
            <Styles.Text>공유한 플랜</Styles.Text>
          </Styles.Box>
          {plan === undefined ? (
            <Spinner text="공유한 플랜을 불러오는 중입니다..." />
          ) : plan.length === 0 ? (
            "공유한 플랜이 없습니다."
          ) : (
            plan.map((el, idx) => {
                return (
                  <Styles.SmallBox key={idx}>
                    <Styles.LineBox>
                      <Styles.ImgBox
                        src={JSON.parse(el[1].plan)[0].list[0].firstimage2 === "" ? "assets/logo.png" : JSON.parse(el[1].plan)[0].list[0].firstimage2}
                        onClick={() => infoMove(el)}
                      />
                      <Styles.ContentBox>
                        <Styles.ContentBox2>
                          <Styles.ContentBox3>
                            <Styles.ContentText>{el[1].title}</Styles.ContentText>
                            <Styles.DayBox>{el[1].date}</Styles.DayBox>
                          </Styles.ContentBox3>
                          <Styles.ModifyDeleteBox open={el[1].type} onClick={onShareBtn}>
                            공유취소
                          </Styles.ModifyDeleteBox>
                        </Styles.ContentBox2>
                      </Styles.ContentBox>
                    </Styles.LineBox>
                  </Styles.SmallBox>
                );
              })
          )}
        </Styles.BigBox>
      </MarginTopWrapper>
    </>
  );
};

export default SharedPlan;
