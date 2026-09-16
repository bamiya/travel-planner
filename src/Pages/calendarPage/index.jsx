import React, { useState, useEffect, useMemo } from "react";
import * as Styles from "./style";
import { MarginTopWrapper } from "../../Common/style";
import Map from "../../Components/naverMap";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import Spinner from "../../Common/Spinner";
import { useLikes } from "../../hooks/useLikes";
import { getProfileImageUrl } from "../../utils/profileImage";
import { getErrorMessage } from "../../utils/errorMessage";
import { getPlanThumbnail } from "../../utils/planThumbnail";

const CalendarPage = () => {
  const navigate = useNavigate();
  const [dateList, setDateList] = useState();
  const [selectedStop, setSelectedStop] = useState(null); // 특정 장소를 클릭해 지도에서 단일 조회 중이면 그 좌표
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [email, setEmail] = useState();
  const { isLiked, toggleLike, reloadLikes } = useLikes("P");
  const planId = location.search.split("=")[1]; // ?id=<planId> - 여러 곳에서 반복 파싱하지 않도록 한 번만 계산

  useEffect(() => {
    if (location.search === "") {
      toast.error("url이 잘못되었습니다.");
      history.back();
    } else {
      sessionStorage.getItem("access_token") !== null ? getEmail() : ""; //  비로그인 시 (토큰없음) getEmail() 실행 X
      getcontent(); // 댓글 렌더링
      getUserPlanById(planId);
    }
  }, []);

  useEffect(() => {
    reloadLikes();
  }, []);

  const getEmail = async () => {
    // DB에 있는 회원데이터를 불러옴
    const data = await axios.get("/getUserInfo");
    setEmail(data.data.data.email);
  };

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
  const allStops = useMemo(() => {
    if (!dateList) return [];
    return JSON.parse(dateList.plan).flatMap((day) => day.list);
  }, [dateList]);
  const routeMarkers = useMemo(() => allStops.map((s) => ({ lat: Number(s.mapy), lon: Number(s.mapx) })), [allStops]);
  const routePath = useMemo(() => routeMarkers.map((m) => [m.lat, m.lon]), [routeMarkers]);

  const moveMapLocation = (stop) => {
    setSelectedStop((prev) => (prev?.contentid === stop.contentid ? null : { contentid: stop.contentid, lat: Number(stop.mapy), lon: Number(stop.mapx) }));
  };

  const writing = async (id) => {
    if (!sessionStorage.getItem("access_token")) {
      toast.info("로그인 후 이용해 주세요");
      return;
    }
    if (window.confirm("등록하시겠습니까?")) {
      try {
        await axios.post("/addComment", { id, content, type: "P" });
        getcontent();
        toast.success("댓글 추가 성공");
        setContent("");
      } catch (e) {
        toast.error(getErrorMessage(e));
      }
    }
  };

  const infoMove = (e) => {
    navigate(`/information?id=${e}`);
  };

  const onShareBtn = async () => {
    try {
      await axios.put("/updateSharePlan", { id: planId });
      getUserPlanById(planId);
    } catch (e) {
      toast.error("사용자 본인만 이용할 수 있는 버튼 입니다.");
    }
  };

  const addLikes = (id) => {
    toggleLike(id, (wasLiked) => {
      setDateList((prev) => ({ ...prev, likeCount: prev.likeCount + (wasLiked ? -1 : 1) }));
    });
  };

  const changeName = (author) => {
    const emailIdStr = author.split("@");
    if (emailIdStr[0].length < 4) return author;
    else {
      const emailIdStrArr = [...emailIdStr[0]];
      emailIdStrArr[1] = "*";
      emailIdStrArr[2] = "*";
      const result = "(" + emailIdStrArr.join("") + "@" + emailIdStr[1] + ")";
      return result;
    }
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
                    <Styles.IntroName color={"true"}>{dateList?.email.name}</Styles.IntroName>
                    <Styles.IntroEmail color={"true"}>{changeName(dateList?.email.email)}</Styles.IntroEmail>
                  </Styles.IntroNE>
                </Styles.IntroTitle>
              </>
            ) : (
              <>
                <Styles.IntroTitle>
                  <Styles.IntroText color={"false"}>{dateList.title}</Styles.IntroText>
                  <Styles.IntroDate color={"false"}>{dateList.date.split("~")[0] + " - " + dateList.date.split("~")[1]}</Styles.IntroDate>
                  <Styles.IntroNE>
                    <Styles.IntroName color={"false"}>{dateList?.email.name}</Styles.IntroName>
                    <Styles.IntroEmail color={"false"}>{changeName(dateList?.email.email)}</Styles.IntroEmail>
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
                    email !== dateList.email.email ? (
                      <div style={{ height: "70px" }} />
                    ) : (
                      <Styles.ShareBtn open={dateList.type} onClick={onShareBtn} />
                    )
                  ) : (
                    <div style={{ height: "70px" }} />
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
                                    return (
                                      <div key={id}>
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
                                      </div>
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
                      {selectedStop ? (
                        <Map lat={selectedStop.lat} lon={selectedStop.lon} />
                      ) : (
                        <Map markers={routeMarkers} path={routePath} />
                      )}
                    </Styles.MapBox>
                  </Styles.Box>
                </Styles.Menu>
                {dateList.type === 0 ? (
                  <Styles.Comment1></Styles.Comment1>
                ) : (
                  <>
                    <Styles.Comment1>
                      <Styles.Title1>톡톡</Styles.Title1>
                      <Styles.CommentBox>
                        {comments.map((el, idx) => {
                          return (
                            <Styles.ReviewBox key={idx}>
                              <Styles.ReImage src={getProfileImageUrl(el.email.profileImg)} />
                              <Styles.RefirstBox>
                                <Styles.ReName>{el?.email?.name}</Styles.ReName>
                                <Styles.ReDate>{el?.date}</Styles.ReDate>
                                <Styles.ReContent>{el?.content}</Styles.ReContent>
                              </Styles.RefirstBox>
                            </Styles.ReviewBox>
                          );
                        })}
                        <Styles.InputBox>
                          <Styles.ReviewTextBox>
                            <Styles.ReviewText>댓글 남기기</Styles.ReviewText>
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
