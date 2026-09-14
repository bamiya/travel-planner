import React, { useEffect, useState } from 'react';
import * as Styles from './style';
import MyPage from '../../myPage';
import { MarginTopWrapper } from "../../../Common/style";
import Paging from '../../../Components/paging';
import Spinner from '../../../Common/Spinner';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyComments = () => {
  const navigate = useNavigate();

  // 공유한 플랜 댓글
  const [page1, setPage1] = useState(1);
  const [itemsCount] = useState(6);
  const [planComments, setPlanComments] = useState();

  // 관광지 댓글
  const [page2, setPage2] = useState(1);
  const [tourComments, setTourComments] = useState();

  useEffect(() => {
    getMyComments();
  }, []);

  const getTourURL = (id) => {
    return `https://apis.data.go.kr/B551011/KorService2/detailCommon2?serviceKey=${process.env.VITE_TOUR_API_KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${id}`;
  };

  const getMyComments = async () => {
    try {
      const data = await axios.get("http://localhost:8080/getMyComments");
      const comments = data.data.data;

      const planList = comments.filter((c) => c.type === "P");
      const tourList = comments.filter((c) => c.type === "T");

      const planResults = await Promise.all(
        planList.map(async (c) => {
          try {
            const plan = await axios.get(`http://localhost:8080/getPlansById/${c.id}`);
            return { ...c, title: plan.data.data.title };
          } catch (e) {
            return { ...c, title: "삭제된 플랜" };
          }
        })
      );
      setPlanComments(planResults);

      const tourResults = await Promise.all(
        tourList.map(async (c) => {
          try {
            const response = await fetch(getTourURL(c.id));
            const json = await response.json();
            const tour = (json.response?.body?.items?.item ?? [])[0];
            return { ...c, title: tour?.title ?? "삭제된 관광지" };
          } catch (e) {
            return { ...c, title: "삭제된 관광지" };
          }
        })
      );
      setTourComments(tourResults);
    } catch (e) {
      toast.error("댓글을 불러오지 못했습니다.");
      setPlanComments([]);
      setTourComments([]);
    }
  };

  const movePlan = (id) => navigate(`/calendar?id=${id}`);
  const moveTour = (id) => navigate(`/information?id=${id}`);

  return (
    <>
      <MyPage myCommentAction="myComment" />
      <MarginTopWrapper>
        <Styles.BigBox>
          <Styles.Box>
            <Styles.Text>공유한 플랜 댓글</Styles.Text>
          </Styles.Box>
          <Styles.SmallBox>
            {planComments === undefined ? (
              <Spinner text="댓글을 불러오는 중입니다..." padding="30px 0" size="26px" />
            ) : planComments.length === 0 ? (
              "작성한 댓글이 없습니다."
            ) : (
              planComments
                .filter((_, idx) => idx >= (page1 - 1) * itemsCount && idx < page1 * itemsCount)
                .map((c, idx) => (
                  <Styles.LineBox key={idx}>
                    <Styles.ImgBox src="assets/기본프로필.png" onClick={() => movePlan(c.id)} />
                    <Styles.ContentBox>
                      <Styles.ContentText onClick={() => movePlan(c.id)}>{c.title}</Styles.ContentText>
                      <Styles.ContentTe>{c.content}</Styles.ContentTe>
                    </Styles.ContentBox>
                    <Styles.DayBox>{c.date}</Styles.DayBox>
                  </Styles.LineBox>
                ))
            )}
          </Styles.SmallBox>
          {planComments && planComments.length > 0 && (
            <Paging page={page1} count={planComments.length} setPage={setPage1} itemsCount={itemsCount} />
          )}
        </Styles.BigBox>

        <Styles.BigBox>
          <Styles.Box>
            <Styles.Text>관광지 댓글</Styles.Text>
          </Styles.Box>
          <Styles.SmallBox>
            {tourComments === undefined ? (
              <Spinner text="댓글을 불러오는 중입니다..." padding="30px 0" size="26px" />
            ) : tourComments.length === 0 ? (
              "작성한 댓글이 없습니다."
            ) : (
              tourComments
                .filter((_, idx) => idx >= (page2 - 1) * itemsCount && idx < page2 * itemsCount)
                .map((c, idx) => (
                  <Styles.LineBox key={idx}>
                    <Styles.ImgBox src="assets/기본프로필.png" onClick={() => moveTour(c.id)} />
                    <Styles.ContentBox>
                      <Styles.ContentText onClick={() => moveTour(c.id)}>{c.title}</Styles.ContentText>
                      <Styles.ContentTe>{c.content}</Styles.ContentTe>
                    </Styles.ContentBox>
                    <Styles.DayBox>{c.date}</Styles.DayBox>
                  </Styles.LineBox>
                ))
            )}
          </Styles.SmallBox>
          {tourComments && tourComments.length > 0 && (
            <Paging page={page2} count={tourComments.length} setPage={setPage2} itemsCount={itemsCount} />
          )}
        </Styles.BigBox>
      </MarginTopWrapper>
    </>
  );
};

export default MyComments;
