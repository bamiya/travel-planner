import React, { useEffect, useState } from "react";
import * as Styles from "./style";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../../Common/Spinner";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import { useConfirm } from "../../Common/ConfirmDialog";
import { getErrorMessage } from "../../utils/errorMessage";

const formatDate = (isoString) => (isoString ? isoString.slice(0, 10) : "");

const NoticePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const confirm = useConfirm();
  const isAdmin = useIsAdmin();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const isNew = params.get("new") === "1";
  const editId = params.get("edit");
  const isForm = isNew || !!editId;

  const [notices, setNotices] = useState();
  const [notice, setNotice] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (isForm && editId) {
      // 수정 폼 - 기존 내용을 불러와 채워둔다
      axios
        .get(`/getNoticeById/${editId}`)
        .then((res) => {
          setTitle(res.data.data.title);
          setContent(res.data.data.content);
        })
        .catch(() => {
          toast.error("공지사항을 불러오지 못했습니다.");
          navigate("/notice");
        });
    } else if (isNew) {
      setTitle("");
      setContent("");
    } else if (id) {
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
  }, [id, isNew, editId]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("제목과 내용을 입력해주세요.");
      return;
    }
    try {
      if (editId) {
        await axios.put("/updateNotice", { id: editId, title, content });
        toast.success("공지사항이 수정되었습니다.");
        navigate(`/notice?id=${editId}`);
      } else {
        await axios.post("/createNotice", { title, content });
        toast.success("공지사항이 등록되었습니다.");
        navigate("/notice");
      }
    } catch (e) {
      toast.error(getErrorMessage(e));
    }
  };

  const handleDelete = async () => {
    if (await confirm("이 공지사항을 삭제하시겠습니까?", { danger: true, confirmText: "삭제" })) {
      try {
        await axios.delete(`/deleteNotice/${id}`);
        toast.success("공지사항이 삭제되었습니다.");
        navigate("/notice");
      } catch (e) {
        toast.error(getErrorMessage(e));
      }
    }
  };

  if (isForm) {
    return (
      <Styles.Wrapper>
        <Styles.BackBtn onClick={() => navigate(editId ? `/notice?id=${editId}` : "/notice")}>← 취소</Styles.BackBtn>
        <Styles.Title>{editId ? "공지사항 수정" : "공지사항 작성"}</Styles.Title>
        <Styles.FormInput placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Styles.FormTextarea placeholder="내용" value={content} onChange={(e) => setContent(e.target.value)} />
        <Styles.SubmitBtn onClick={handleSubmit}>{editId ? "수정 완료" : "등록"}</Styles.SubmitBtn>
      </Styles.Wrapper>
    );
  }

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
            {isAdmin && (
              <Styles.AdminRow>
                <Styles.AdminBtn onClick={() => navigate(`/notice?edit=${id}`)}>수정</Styles.AdminBtn>
                <Styles.AdminBtn danger onClick={handleDelete}>
                  삭제
                </Styles.AdminBtn>
              </Styles.AdminRow>
            )}
          </>
        )}
      </Styles.Wrapper>
    );
  }

  return (
    <Styles.Wrapper>
      <Styles.TitleRow>
        <Styles.Title>공지사항</Styles.Title>
        {isAdmin && <Styles.AdminBtn onClick={() => navigate("/notice?new=1")}>글쓰기</Styles.AdminBtn>}
      </Styles.TitleRow>
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
