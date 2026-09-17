import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import * as Styles from "./NicknamePopover.style";
import { getProfileImageUrl } from "../utils/profileImage";

// 댓글/플랜 작성자 닉네임을 누르면 뜨는 스팀 미니프로필 느낌의 카드.
// 닉네임 클릭 -> /getPublicProfile/{nickname}으로 공유한 플랜 수/댓글 수만 가볍게 조회한다
// (그 외 개인정보는 서버가 애초에 안 내려준다).
const NicknamePopover = ({ nickname }) => {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!imageOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setImageOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [imageOpen]);

  useEffect(() => {
    if (!open) return undefined;
    const onClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const handleClick = async () => {
    if (open) {
      setOpen(false);
      return;
    }
    setOpen(true);
    if (profile || loading) return;
    setLoading(true);
    setFailed(false);
    try {
      const res = await axios.get(`/getPublicProfile/${encodeURIComponent(nickname)}`);
      setProfile(res.data.data);
    } catch (e) {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  if (!nickname) return null;

  return (
    <Styles.Wrapper ref={wrapperRef}>
      <Styles.NicknameBtn onClick={handleClick}>{nickname}</Styles.NicknameBtn>
      {open && (
        <Styles.Popover>
          {loading ? (
            <Styles.Loading>불러오는 중...</Styles.Loading>
          ) : failed ? (
            <Styles.Loading>정보를 불러오지 못했습니다.</Styles.Loading>
          ) : (
            <>
              <Styles.PopoverHeader>
                <Styles.Avatar src={getProfileImageUrl(profile?.profileImg)} alt="프로필 사진" onClick={() => setImageOpen(true)} />
                <Styles.NicknameText>{profile?.nickname ?? nickname}</Styles.NicknameText>
              </Styles.PopoverHeader>
              <Styles.StatsRow>
                <Styles.Stat>
                  <Styles.StatValue>{profile?.planCount ?? 0}</Styles.StatValue>
                  <Styles.StatLabel>공유한 플랜</Styles.StatLabel>
                </Styles.Stat>
                <Styles.Stat>
                  <Styles.StatValue>{profile?.commentCount ?? 0}</Styles.StatValue>
                  <Styles.StatLabel>작성한 댓글</Styles.StatLabel>
                </Styles.Stat>
              </Styles.StatsRow>
            </>
          )}
        </Styles.Popover>
      )}
      {imageOpen &&
        createPortal(
          <Styles.Lightbox onClick={() => setImageOpen(false)}>
            <Styles.LightboxClose onClick={() => setImageOpen(false)}>✕</Styles.LightboxClose>
            <Styles.LightboxImg src={getProfileImageUrl(profile?.profileImg)} alt="프로필 사진 크게 보기" onClick={(e) => e.stopPropagation()} />
          </Styles.Lightbox>,
          document.body
        )}
    </Styles.Wrapper>
  );
};

export default NicknamePopover;
