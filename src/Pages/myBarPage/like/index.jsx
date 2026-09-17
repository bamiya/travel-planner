import React, { useEffect, useState } from "react";
import * as Styles from "./style";
import MyPage from "../../myPage";
import { MarginTopWrapper } from "../../../Common/style";
import { HeartFilled } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../../Common/Spinner";
import { getTourDetailUrl } from "../../../utils/tourApi";
import { getPlanThumbnail } from "../../../utils/planThumbnail";
import { useConfirm } from "../../../Common/ConfirmDialog";

const Like = () => {
  const navigate = useNavigate();
  const confirm = useConfirm();

  // 관광지 좋아요 로딩 state
  const [isLikeLoding, setIsLikeLoding] = useState(false);
  const [tourInfo, setTourInfo] = useState([]);

  // 관광지 찜하기 로딩 state
  const [isDibsLoding, setIsDibsLoding] = useState(false);
  const [dibsInfo, setDibsInfo] = useState([]);

  // 플랜 찜하기 로딩 state
  const [isPlanLoding, setIsPlanLoding] = useState(false);
  const [planInfo, setPlanInfo] = useState([]);

  useEffect(() => {
    getTourData();
    getDibsData();
  }, []);

  // 좋아요를 누른 관광지 정보를 가져옴
  const getTourData = async () => {
    setIsLikeLoding(false);
    setIsPlanLoding(false);
    try {
      const data = await axios.post("/getLikes");
      const likeData = data.data.data.filter((e) => e.type === "T");
      const likePlanData = data.data.data.filter((e) => e.type === "P");
      if (likeData.length === 0) {
        setIsLikeLoding(true);
      } else {
        for (let i = 0; i < likeData.length; i++) {
          const response = await fetch(getTourDetailUrl(likeData[i].id));
          const json = await response.json();
          const tourItems = json.response?.body?.items?.item ?? [];
          setTourInfo((prev) => [...prev, tourItems[0]]);
        }
        setIsLikeLoding(true);
      }
      if (likePlanData.length === 0) {
        setIsPlanLoding(true);
        return;
      } else {
        for (let i = 0; i < likePlanData.length; i++) {
          const data = await axios.get(`/getPlansById/${likePlanData[i].id}`);
          if (!data.data.data.type) {
            continue;
          }
          setPlanInfo((prev) => [
            ...prev,
            {
              title: data.data.data.title,
              author: data.data.data.email.nickname,
              date: data.data.data.date,
              img: getPlanThumbnail(data.data.data.plan),
              id: data.data.data.id,
            },
          ]);
        }
        setIsPlanLoding(true);
      }
    } catch (e) {
      // 로그인 세션이 없어서 401이 나는 건 정상 상태(그냥 빈 목록으로 보여주면 됨)라
      // 놀랄 만한 빨간 에러 토스트를 띄울 이유가 아니다. 그 외의 진짜 실패만 알린다.
      if (e.response?.status !== 401) {
        toast.error("좋아요 정보를 불러오지 못했습니다.");
      }
      setIsLikeLoding(true);
      setIsPlanLoding(true);
    }
  };

  // 좋아요 제거 함수
  const likeCancel = async (id, type) => {
    try {
      await axios.delete(`/removeLikes/${id}?type=${type}`);
      if (type === "P") {
        setPlanInfo((prev) => prev.filter((e) => e.id !== id));
      } else {
        setTourInfo((prev) => prev.filter((e) => e.contentid !== id));
      }
    } catch (e) {
      toast.error("좋아요 취소에 실패했습니다.");
    }
  };

  // 찜하기 목록 가져오는 함수
  const getDibsData = async () => {
    setIsDibsLoding(false);
    setDibsInfo([]);
    try {
      if (sessionStorage.getItem("dibs")) {
        const dibs = sessionStorage.getItem("dibs").split(" ");
        dibs.pop();
        for (let i = 0; i < dibs.length; i++) {
          const response = await fetch(getTourDetailUrl(dibs[i]));
          const json = await response.json();
          const dibsItems = json.response?.body?.items?.item ?? [];
          setDibsInfo((prev) => [...prev, dibsItems[0]]);
        }
      }
    } catch (e) {
      toast.error("찜하기 정보를 불러오지 못했습니다.");
    } finally {
      setIsDibsLoding(true);
    }
  };

  // 찜하기 취소 함수
  const dibsCancel = async (id) => {
    if (await confirm("찜취소하시겠습니까?", { danger: true, confirmText: "취소" })) {
      const dibs = sessionStorage.getItem("dibs");
      sessionStorage.setItem("dibs", dibs.replace(id + " ", ""));
      setDibsInfo((prev) => prev.filter((e) => e.contentid !== id));
    }
  };

  return (
    <>
      <MyPage likeAction="like" />
      <MarginTopWrapper>
        <Styles.BigBox>
          <Styles.Section>
            <Styles.SectionTitle>좋아요한 플랜</Styles.SectionTitle>
            {!isPlanLoding ? (
              <Spinner text="불러오는 중입니다..." padding="30px 0" size="26px" />
            ) : planInfo.length === 0 ? (
              <Styles.EmptyText>좋아요를 누른 항목이 없습니다.</Styles.EmptyText>
            ) : (
              <Styles.CardGrid>
                {planInfo.map((el, idx) => (
                  <Styles.Card key={idx}>
                    <Styles.ImgBox src={el.img ? el.img : "assets/logo.png"} onClick={() => navigate(`/calendar?id=${el.id}`)} />
                    <Styles.CardBody>
                      <Styles.ContentText onClick={() => navigate(`/calendar?id=${el.id}`)}>{el.title}</Styles.ContentText>
                      <Styles.AddressText>{el.date}</Styles.AddressText>
                      <Styles.CardFooterRow>
                        <Styles.NameText>{el?.author}</Styles.NameText>
                        <Styles.HeartBtn onClick={() => likeCancel(el.id, "P")}>
                          <HeartFilled />
                        </Styles.HeartBtn>
                      </Styles.CardFooterRow>
                    </Styles.CardBody>
                  </Styles.Card>
                ))}
              </Styles.CardGrid>
            )}
          </Styles.Section>

          <Styles.Section>
            <Styles.SectionTitle>좋아요한 관광지</Styles.SectionTitle>
            {!isLikeLoding ? (
              <Spinner text="불러오는 중입니다..." padding="30px 0" size="26px" />
            ) : tourInfo.length === 0 ? (
              <Styles.EmptyText>좋아요를 누른 항목이 없습니다.</Styles.EmptyText>
            ) : (
              <Styles.CardGrid>
                {tourInfo.map((el, idx) => (
                  <Styles.Card key={idx}>
                    <Styles.ImgBox
                      src={el?.firstimage2 === "" ? "assets/logo.png" : el?.firstimage2}
                      onClick={() => navigate(`/information?id=${el?.contentid}`)}
                    />
                    <Styles.CardBody>
                      <Styles.ContentText onClick={() => navigate(`/information?id=${el?.contentid}`)}>{el?.title}</Styles.ContentText>
                      <Styles.AddressText>{el?.addr1}</Styles.AddressText>
                      <Styles.CardFooterRow>
                        <Styles.NameText />
                        <Styles.HeartBtn onClick={() => likeCancel(el?.contentid, "T")}>
                          <HeartFilled />
                        </Styles.HeartBtn>
                      </Styles.CardFooterRow>
                    </Styles.CardBody>
                  </Styles.Card>
                ))}
              </Styles.CardGrid>
            )}
          </Styles.Section>

          <Styles.Section>
            <Styles.SectionTitle>찜 목록</Styles.SectionTitle>
            {!sessionStorage.getItem("dibs") ? (
              <Styles.EmptyText>찜하기로 선택된 항목이 없습니다.</Styles.EmptyText>
            ) : !isDibsLoding ? (
              <Spinner text="불러오는 중입니다..." padding="30px 0" size="26px" />
            ) : dibsInfo.length === 0 ? (
              <Styles.EmptyText>찜하기로 선택된 항목이 없습니다.</Styles.EmptyText>
            ) : (
              <Styles.CardGrid>
                {dibsInfo.map((el, idx) => (
                  <Styles.Card key={idx}>
                    <Styles.ImgBox
                      src={el?.firstimage2 === "" ? "assets/logo.png" : el?.firstimage2}
                      onClick={() => navigate(`/information?id=${el?.contentid}`)}
                    />
                    <Styles.CardBody>
                      <Styles.ContentText onClick={() => navigate(`/information?id=${el?.contentid}`)}>{el?.title}</Styles.ContentText>
                      <Styles.AddressText>{el?.addr1}</Styles.AddressText>
                      <Styles.CancelBtn onClick={() => dibsCancel(el?.contentid)}>찜 취소</Styles.CancelBtn>
                    </Styles.CardBody>
                  </Styles.Card>
                ))}
              </Styles.CardGrid>
            )}
          </Styles.Section>
        </Styles.BigBox>
      </MarginTopWrapper>
    </>
  );
};

export default Like;
