import React, { useEffect, useState } from "react";
import * as Styles from "./style";
import MyPage from "../../myPage";
import { MarginTopWrapper } from "../../../Common/style";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../../../Common/Spinner";
import { getPlanThumbnail } from "../../../utils/planThumbnail";
import { useConfirm } from "../../../Common/ConfirmDialog";

const SharedPlan = () => {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const [plan, setPlan] = useState();

  useEffect(() => {
    getUserPlan();
  }, []);

  const getUserPlan = async () => {
    // DB에 있는 플랜데이터
    try {
      const data = await axios.get("/getShareMyPlan");
      setPlan(Object.entries(data.data.data));
    } catch (e) {
      setPlan([]);
    }
  };

  const onShareBtn = async (el) => {
    if (await confirm("공유취소하시겠습니까?", { danger: true, confirmText: "공유 취소" })) {
      try {
        await axios.put("/updateSharePlan", { id: el[1].id });
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
          <Styles.SectionTitle>공유한 플랜</Styles.SectionTitle>
          {plan === undefined ? (
            <Spinner text="공유한 플랜을 불러오는 중입니다..." />
          ) : plan.length === 0 ? (
            <Styles.EmptyText>공유한 플랜이 없습니다.</Styles.EmptyText>
          ) : (
            <Styles.PlanGrid>
              {plan.map((el, idx) => (
                <Styles.PlanCard key={idx}>
                  <Styles.ImgBox src={getPlanThumbnail(el[1].plan)} onClick={() => infoMove(el)} />
                  <Styles.CardBody>
                    <Styles.ContentText onClick={() => infoMove(el)}>{el[1].title}</Styles.ContentText>
                    <Styles.DayBox>{el[1].date}</Styles.DayBox>
                    <Styles.ActionRow>
                      <Styles.ModifyDeleteBox primary onClick={() => infoMove(el)}>
                        보기
                      </Styles.ModifyDeleteBox>
                      <Styles.ModifyDeleteBox danger onClick={() => onShareBtn(el)}>
                        공유취소
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

export default SharedPlan;
