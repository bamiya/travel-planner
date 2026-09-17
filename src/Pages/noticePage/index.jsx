import React, { useEffect, useState } from "react";
import * as Styles from "./style";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../../Common/Spinner";

const formatDate = (isoString) => (isoString ? isoString.slice(0, 10) : "");

const NoticePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = new URLSearchParams(location.search).get("id");

  const [notices, setNotices] = useState();
  const [notice, setNotice] = useState();

  useEffect(() => {
    if (id) {
      setNotice(undefined);
      axios
        .get(`/getNoticeById/${id}`)
        .then((res) => setNotice(res.data.data))
        .catch(() => {
          toast.error("공지사항을 불러오지 못했습니다.");
          navigate("/notice");
        });
    } else {
      axios
        .get("/getNotices")
        .then((res) => setNotices(res.data.data))
        .catch(() => setNotices([]));
    }
  }, [id]);

  if (id) {
    return (
      <Styles.Wrapper>
        <Styles.BackBtn onClick={() => navigate("/notice")}>← 목록으로</Styles.BackBtn>
        {notice === undefined ? (
          <Spinner text="불러오는 중입니다..." padding="80px 0" />
        ) : (
          <>
            <Styles.DetailTitle>{notice.title}</Styles.DetailTitle>
            <Styles.DetailDate>{formatDate(notice.createdAt)}</Styles.DetailDate>
            <Styles.DetailContent>{notice.content}</Styles.DetailContent>
          </>
        )}
      </Styles.Wrapper>
    );
  }

  return (
    <Styles.Wrapper>
      <Styles.Title>공지사항</Styles.Title>
      {notices === undefined ? (
        <Spinner text="불러오는 중입니다..." padding="80px 0" />
      ) : notices.length === 0 ? (
        <Styles.EmptyText>등록된 공지사항이 없습니다.</Styles.EmptyText>
      ) : (
        <Styles.NoticeList>
          {notices.map((n) => (
            <Styles.NoticeRow key={n.id} onClick={() => navigate(`/notice?id=${n.id}`)}>
              <Styles.NoticeTitle>{n.title}</Styles.NoticeTitle>
              <Styles.NoticeDate>{formatDate(n.createdAt)}</Styles.NoticeDate>
            </Styles.NoticeRow>
          ))}
        </Styles.NoticeList>
      )}
    </Styles.Wrapper>
  );
};

export default NoticePage;
