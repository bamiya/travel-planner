import React, { useEffect, useState } from "react";
import * as Styles from "./style";
import MyPage from "../../myPage";
import { MarginTopWrapper } from "../../../Common/style";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../Common/Spinner";
import { getPlanThumbnail } from "../../../utils/planThumbnail";

const MyPlan = () => {
  const navigate = useNavigate();
  const [plan, setPlan] = useState();

  useEffect(() => {
    getUserPlan();
  }, []);

  const getUserPlan = async () => {
    // DB에 있는 플랜데이터
    try {
      const data = await axios.get("/getUserPlan");
      const planArr = Object.entries(data.data.data);
      setPlan(planArr);
    } catch (e) {
      setPlan([]);
    }
  };

  const deleteUserPlan = async (id) => {
    if (window.confirm("삭제하시겠습니까?")) {
      await axios.delete(`/deleteUserPlan/${id}`);
      getUserPlan();
    }
  };

  const infoMove = (e) => {
    navigate(`/calendar?id=${e.id}`);
  };

  const onPlanEdit = (el) => {
    if (window.confirm("수정하시겠습니까?")) {
      navigate("/createPlanPage", { state: { updateData: el[1], date: el[1].date } });
    }
  };


  return (
    <>
      <MyPage myPlanAction="myPlan" />
      <MarginTopWrapper>
        <Styles.BigBox>
          <Styles.SectionTitle>나의 플랜</Styles.SectionTitle>
          {plan === undefined ? (
            <Spinner text="플랜을 불러오는 중입니다..." />
          ) : plan.length === 0 ? (
            <Styles.EmptyText>등록된 플랜이 없습니다.</Styles.EmptyText>
          ) : (
            <Styles.PlanGrid>
              {plan.map((el, idx) => (
                <Styles.PlanCard key={idx}>
                  <Styles.ImgBox src={getPlanThumbnail(el[1].plan)} onClick={() => infoMove(el[1])} />
                  <Styles.CardBody>
                    <Styles.ContentText onClick={() => infoMove(el[1])}>{el[1].title}</Styles.ContentText>
                    <Styles.DayBox>{el[1].date}</Styles.DayBox>
                    <Styles.ActionRow>
                      <Styles.ModifyDeleteBox primary onClick={() => infoMove(el[1])}>
                        보기
                      </Styles.ModifyDeleteBox>
                      <Styles.ModifyDeleteBox onClick={() => onPlanEdit(el)}>수정</Styles.ModifyDeleteBox>
                      <Styles.ModifyDeleteBox danger onClick={() => deleteUserPlan(el[1].id)}>
                        삭제
                      </Styles.ModifyDeleteBox>
                    </Styles.ActionRow>
                  </Styles.CardBody>
                </Styles.PlanCard>
              ))}
            </Styles.PlanGrid>
          )}
        </Styles.BigBox>
      </MarginTopWrapper>
    </>
  );
};

export default MyPlan;
