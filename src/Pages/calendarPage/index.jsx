import React, { useState, useEffect, useMemo, useRef } from "react";
import * as Styles from "./style";
import { MarginTopWrapper } from "../../Common/style";
import Map from "../../Components/naverMap";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import { HeartOutlined, HeartFilled, ShareAltOutlined, CheckCircleFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import Spinner from "../../Common/Spinner";
import { useLikes } from "../../hooks/useLikes";
import { getProfileImageUrl } from "../../utils/profileImage";
import { getErrorMessage } from "../../utils/errorMessage";
import { getPlanThumbnail } from "../../utils/planThumbnail";
import { distanceMeters } from "../../utils/nearbySearch";
import { estimateTravelTime } from "../../utils/travelTime";
import { fetchRouteInfo } from "../../utils/routing";
import { useConfirm } from "../../Common/ConfirmDialog";
import NicknamePopover from "../../Common/NicknamePopover";
import StarRating from "../../Common/StarRating";
import { useIsAdmin } from "../../hooks/useIsAdmin";

const CalendarPage = () => {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const [dateList, setDateList] = useState();
  const [selectedStop, setSelectedStop] = useState(null); // 특정 장소를 클릭해 지도에서 단일 조회 중이면 그 좌표
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const { isLiked, toggleLike, reloadLikes } = useLikes("P");
  const isAdmin = useIsAdmin();
  const planId = location.search.split("=")[1]; // ?id=<planId> - 여러 곳에서 반복 파싱하지 않도록 한 번만 계산

  useEffect(() => {
    if (location.search === "") {
      toast.error("url이 잘못되었습니다.");
      history.back();
    } else {
      getcontent(); // 댓글 렌더링
      getUserPlanById(planId);
    }
  }, []);

  useEffect(() => {
    reloadLikes();
  }, []);

  const getcontent = async () => {
    const data = await axios.get(`/getComment?id=${planId}&type=P`);
    setComments(data.data.data.filter((e) => e.type === "P"));
  };

  const getUserPlanById = async (id) => {
    // DB에 있는 플랜데이터
    try {
      const data = await axios.get(`/getPlansById/${id}`);
      setDateList(data.data.data);
    } catch (e) {
      toast.error("플랜 정보를 불러오지 못했습니다.");
    }
  };

  // 플랜 전체 동선: 모든 DAY의 장소를 순서대로 이어서 지도에 번호 마커+경로선으로 보여준다.
  // dayIdx/stopIdx를 같이 들고 있어야 아래에서 "같은 날짜 안에서의 이동"만 카드 목록의
  // 이동시간 칩으로 보여줄지 판단할 수 있다 (DAY 경계를 넘는 이동은 칩에 안 보여줌).
  const allStops = useMemo(() => {
    if (!dateList) return [];
    return JSON.parse(dateList.plan).flatMap((day, dayIdx) => day.list.map((stop, stopIdx) => ({ ...stop, dayIdx, stopIdx })));
  }, [dateList]);
  const routeMarkers = useMemo(() => allStops.map((s) => ({ lat: Number(s.mapy), lon: Number(s.mapx), id: s.contentid })), [allStops]);
  // 지도에 그릴 경로선: OSRM 실제 도로 경로가 오기 전까지는 직선 연결로 우선 보여주고,
  // 각 구간의 실제 경로가 도착하는 대로 이어붙여 교체한다.
  const [routePath, setRoutePath] = useState([]);

  // 전체 동선(allStops)을 순서대로 따라가며 구간별 실제 경로(OSRM)를 하나씩 불러온다.
  // - 지도 경로선(routePath)은 모든 구간(DAY 경계를 넘는 구간 포함)을 실제 도로 좌표로 이어붙인다.
  // - 카드 목록의 이동시간 칩(travelTimes)은 같은 날짜 안에서의 구간만 채운다.
  // OSRM 데모서버가 초당 1건 제한이라 병렬이 아니라 순차로 호출한다.
  const [travelTimes, setTravelTimes] = useState({}); // key: `${dayIdx}-${stopIdx}` -> 라벨 문자열
  useEffect(() => {
    // 실제 경로가 도착하기 전까지는 직선 연결로 우선 보여준다 (빈 지도 방지).
    setRoutePath(allStops.map((s) => [Number(s.mapy), Number(s.mapx)]));
    if (allStops.length < 2) return;
    let cancelled = false;
    const loadRoute = async () => {
      let path = [[Number(allStops[0].mapy), Number(allStops[0].mapx)]];
      for (let i = 0; i < allStops.length - 1; i++) {
        if (cancelled) return;
        const from = allStops[i];
        const to = allStops[i + 1];
        const meters = distanceMeters(Number(from.mapy), Number(from.mapx), Number(to.mapy), Number(to.mapx));
        const estimate = estimateTravelTime(meters); // 직선거리로 도보/차량 모드만 우선 판단
        const route = estimate
          ? await fetchRouteInfo(Number(from.mapy), Number(from.mapx), Number(to.mapy), Number(to.mapx), estimate.mode, true)
          : null;
        const hasGeometry = route?.coordinates?.length > 1;
        // hasGeometry면 from 지점을 포함한 전체 구간 좌표라 첫 점(from, 이미 있음)은 빼고 이어붙인다.
        path = hasGeometry ? [...path, ...route.coordinates.slice(1)] : [...path, [Number(to.mapy), Number(to.mapx)]];
        if (!cancelled) setRoutePath([...path]);

        if (from.dayIdx === to.dayIdx) {
          const label = route
            ? `${estimate.mode === "walk" ? "🚶 도보" : "🚗 차량"} 약 ${route.minutes}분`
            : estimate
            ? `약 ${(meters / 1000).toFixed(1)}km`
            : null;
          if (!cancelled) {
            setTravelTimes((prev) => ({ ...prev, [`${from.dayIdx}-${from.stopIdx}`]: label }));
          }
        }
      }
    };
    loadRoute();
    return () => {
      cancelled = true;
    };
  }, [allStops]);

  const moveMapLocation = (stop) => {
    // 스크롤로도 같은 상태(selectedStop)를 계속 갱신하기 때문에, 클릭은 토글이 아니라
    // 그냥 "지금 이 위치로" 지정만 한다 (다시 클릭해서 끄는 개념이 의미가 없어짐).
    setSelectedStop({ contentid: stop.contentid, lat: Number(stop.mapy), lon: Number(stop.mapx) });
  };

  // 리스트를 스크롤할 때 화면 중앙 부근에 걸린 항목을 자동으로 "현재 위치"로 잡아서
  // 지도가 같이 따라가고(포커스) 해당 마커가 강조되도록 한다 (스크롤스파이).
  const rowRefs = useRef({});
  useEffect(() => {
    if (allStops.length === 0) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const mostVisible = visible.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b));
        const key = mostVisible.target.dataset.stopKey;
        const stop = allStops.find((s) => `${s.dayIdx}-${s.stopIdx}` === key);
        if (stop) {
          setSelectedStop({ contentid: stop.contentid, lat: Number(stop.mapy), lon: Number(stop.mapx) });
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.5, 1] }
    );
    Object.values(rowRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [allStops]);

  const writing = async (id) => {
    if (!sessionStorage.getItem("access_token")) {
      toast.info("로그인 후 이용해 주세요");
      return;
    }
    if (!rating) {
      toast.error("별점을 선택해주세요.");
      return;
    }
    if (await confirm("등록하시겠습니까?")) {
      try {
        await axios.post("/addComment", { id, content, rating, type: "P" });
        getcontent();
        toast.success("댓글 추가 성공");
        setContent("");
        setRating(0);
      } catch (e) {
        toast.error(getErrorMessage(e));
      }
    }
  };

  const deleteCommentAdmin = async (idx) => {
    if (await confirm("이 댓글을 삭제하시겠습니까?", { danger: true, confirmText: "삭제" })) {
      try {
        await axios.delete(`/deleteComment/${idx}?type=P`);
        getcontent();
        toast.success("댓글이 삭제되었습니다.");
      } catch (e) {
        toast.error(getErrorMessage(e));
      }
    }
  };

  const infoMove = (e) => {
    navigate(`/information?id=${e}`);
  };

  const onShareBtn = async () => {
    const turningOff = dateList.type === 1;
    // 공유를 끄면 다른 사람은 더 이상 이 플랜에 접근할 수 없어지므로, 끌 때만 한 번 확인한다.
    if (turningOff && !(await confirm("공유를 취소하면 다른 사람이 이 플랜에 더 이상 접근할 수 없어요. 계속할까요?", { danger: true, confirmText: "공유 취소" }))) return;
    try {
      await axios.put("/updateSharePlan", { id: planId });
      await getUserPlanById(planId);
      toast.success(turningOff ? "공유가 취소되었습니다." : "플랜이 공유되었습니다.");
    } catch (e) {
      toast.error("사용자 본인만 이용할 수 있는 버튼 입니다.");
    }
  };

  const addLikes = (id) => {
    toggleLike(id, (wasLiked) => {
      setDateList((prev) => ({ ...prev, likeCount: prev.likeCount + (wasLiked ? -1 : 1) }));
    });
  };

  return (
    <>
      {dateList === undefined ? (
        <Spinner text="플랜 정보를 불러오는 중입니다..." padding="150px 0" />
      ) : (
        <>
          <Styles.ImageBox>
            <Styles.Image src={getPlanThumbnail(dateList.plan, "firstimage")} />
            {getPlanThumbnail(dateList.plan, "firstimage", "") !== "" ? (
              <>
                <Styles.IntroTitle>
                  <Styles.IntroText color={"true"}>{dateList.title}</Styles.IntroText>
                  <Styles.IntroDate color={"true"}>{dateList.date.split("~")[0] + " - " + dateList.date.split("~")[1]}</Styles.IntroDate>
                  <Styles.IntroNE>
                    <Styles.IntroName color={"true"}>{dateList?.email.nickname}</Styles.IntroName>
                  </Styles.IntroNE>
                </Styles.IntroTitle>
              </>
            ) : (
              <>
                <Styles.IntroTitle>
                  <Styles.IntroText color={"false"}>{dateList.title}</Styles.IntroText>
                  <Styles.IntroDate color={"false"}>{dateList.date.split("~")[0] + " - " + dateList.date.split("~")[1]}</Styles.IntroDate>
                  <Styles.IntroNE>
                    <Styles.IntroName color={"false"}>{dateList?.email.nickname}</Styles.IntroName>
                  </Styles.IntroNE>
                </Styles.IntroTitle>
              </>
            )}
          </Styles.ImageBox>
          <MarginTopWrapper>
            <Styles.Wrapper>
              <Styles.ContentBox>
                <Styles.ShareBtnBox>
                  {sessionStorage.getItem("access_token") !== null ? (
                    !dateList.mine ? (
                      <div style={{ height: "40px" }} />
                    ) : (
                      <Styles.ShareToggleBtn shared={dateList.type === 1} onClick={onShareBtn}>
                        {dateList.type === 1 ? (
                          <>
                            <CheckCircleFilled /> 공유 중
                          </>
                        ) : (
                          <>
                            <ShareAltOutlined /> 공유하기
                          </>
                        )}
                      </Styles.ShareToggleBtn>
                    )
                  ) : (
                    <div style={{ height: "40px" }} />
                  )}
                  <Styles.HeartBox>
                    {isLiked(dateList.id) ? (
                      <HeartFilled style={{ color: "red", fontSize: "30px" }} onClick={() => addLikes(dateList.id)} />
                    ) : (
                      <HeartOutlined style={{ fontSize: "30px" }} onClick={() => addLikes(dateList.id)} />
                    )}
                    <Styles.LikeCount>{dateList.likeCount}</Styles.LikeCount>
                  </Styles.HeartBox>
                </Styles.ShareBtnBox>
                <Styles.Menu>
                  <Styles.Title>상세 정보</Styles.Title>
                  <Styles.Box>
                    <Styles.PlanInfoList>
                      {JSON.parse(dateList.plan).map((el, idx) => {
                        return (
                          <div key={idx}>
                            <Styles.DayList>
                              <Styles.Day>{"Day" + el.day}</Styles.Day>
                              <Styles.PlanInfoList>
                                {el.list.length === 0 ? (
                                  <Styles.Text>
                                    <Styles.PlaceTitle>추가한 관광지가 없습니다.</Styles.PlaceTitle>{" "}
                                  </Styles.Text>
                                ) : (
                                  el.list.map((day, id) => {
                                    const isLast = id === el.list.length - 1;
                                    return (
                                      <Styles.TimelineRow key={id} ref={(el) => (rowRefs.current[`${idx}-${id}`] = el)} data-stop-key={`${idx}-${id}`}>
                                        <Styles.BadgeColumn>
                                          <Styles.NumberBadge>{id + 1}</Styles.NumberBadge>
                                          {!isLast && <Styles.ConnectorLine />}
                                        </Styles.BadgeColumn>
                                        <Styles.RowContent>
                                          <Styles.PlaceInfo>
                                            <Styles.PlanImage
                                              src={day?.firstimage2 === "" ? "assets/logo.png" : day?.firstimage2}
                                              onClick={() => {
                                                infoMove(day.contentid);
                                              }}
                                            />
                                            <Styles.Text>
                                              <Styles.PlaceTitle
                                                onClick={() => {
                                                  infoMove(day.contentid);
                                                }}>
                                                {day.title}
                                              </Styles.PlaceTitle>
                                              <Styles.Content>{day.addr1} </Styles.Content>
                                            </Styles.Text>
                                            <Styles.MapBtnBox open={selectedStop?.contentid === day.contentid} onClick={() => moveMapLocation(day)} />
                                          </Styles.PlaceInfo>
                                          {!isLast && <Styles.TravelChip>{travelTimes[`${idx}-${id}`] ?? "이동시간 계산 중..."}</Styles.TravelChip>}
                                        </Styles.RowContent>
                                      </Styles.TimelineRow>
                                    );
                                  })
                                )}
                              </Styles.PlanInfoList>
                            </Styles.DayList>
                          </div>
                        );
                      })}
                    </Styles.PlanInfoList>
                    <Styles.MapBox>
                      <Map markers={routeMarkers} path={routePath} focus={selectedStop} />
                    </Styles.MapBox>
                  </Styles.Box>
                </Styles.Menu>
                {dateList.type === 0 ? (
                  <Styles.Comment1></Styles.Comment1>
                ) : (
                  <>
                    <Styles.Comment1>
                      <Styles.Title1>
                        톡톡
                        {(() => {
                          const rated = comments.filter((c) => c.rating);
                          if (rated.length === 0) return null;
                          const avg = rated.reduce((sum, c) => sum + c.rating, 0) / rated.length;
                          return (
                            <Styles.AvgRatingBox>
                              <StarRating value={Math.round(avg)} size="15px" />
                              <span>
                                {avg.toFixed(1)} ({rated.length})
                              </span>
                            </Styles.AvgRatingBox>
                          );
                        })()}
                      </Styles.Title1>
                      <Styles.CommentBox>
                        {comments.map((el, idx) => {
                          return (
                            <Styles.ReviewBox key={idx}>
                              <Styles.ReImage src={getProfileImageUrl(el.email.profileImg)} />
                              <Styles.RefirstBox>
                                <NicknamePopover nickname={el?.email?.nickname} />
                                {el.rating && <StarRating value={el.rating} size="13px" />}
                                <Styles.ReDate>{el?.date}</Styles.ReDate>
                                <Styles.ReContent>{el?.content}</Styles.ReContent>
                                {isAdmin && <Styles.AdminDeleteBtn onClick={() => deleteCommentAdmin(el.idx)}>삭제</Styles.AdminDeleteBtn>}
                              </Styles.RefirstBox>
                            </Styles.ReviewBox>
                          );
                        })}
                        <Styles.InputBox>
                          <Styles.ReviewTextBox>
                            <Styles.ReviewText>댓글 남기기</Styles.ReviewText>
                            <StarRating value={rating} onChange={setRating} size="20px" />
                          </Styles.ReviewTextBox>
                          <Styles.Profile1 src={getProfileImageUrl(sessionStorage.getItem("profileImg"))} />
                          <Styles.InputComment placeholder="댓글 입력" onChange={(e) => setContent(e.target.value)} value={content || ""} />
                          <Styles.InputBtn
                            onClick={() => {
                              writing(planId);
                            }}>
                            등록
                          </Styles.InputBtn>
                        </Styles.InputBox>
                      </Styles.CommentBox>
                    </Styles.Comment1>
                  </>
                )}
              </Styles.ContentBox>
            </Styles.Wrapper>
          </MarginTopWrapper>
        </>
      )}
    </>
  );
};
export default CalendarPage;
