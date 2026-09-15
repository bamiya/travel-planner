import React, { useEffect, useState } from "react";
import * as Styles from "./style";
import { MarginTopWrapper } from "../../Common/style";
import Map from "../../Components/kakaoMap";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Common/Spinner";

const InformationPage = () => {
  const navigate = useNavigate();
  const [infoData, setInfoData] = useState();
  useEffect(() => {
    if (location.search === "") {
      toast.error("url이 잘못되었습니다.");
      history.back();
    } else {
      getTravelInfo(location.search.split("=")[1]);
    }
  }, []);

  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const [dibs, setDibs] = useState(false); // 찜 이벤트를 할때마다 렌더링이 되지 않아 업데이트가 안됨 따라서 생성
  const [like, setLike] = useState([]);

  useEffect(() => {

  }, [infoData]);

  // 선택한 관광지 주변 맛집/명소 추천 (TourAPI 위치기반 조회)
  const [nearby, setNearby] = useState([]);
  useEffect(() => {
    if (!infoData?.mapx || !infoData?.mapy) return;
    const getNearby = async () => {
      try {
        const response = await fetch(
          `https://apis.data.go.kr/B551011/KorService2/locationBasedList2?serviceKey=${process.env.VITE_TOUR_API_KEY}&numOfRows=15&MobileOS=ETC&MobileApp=AppTest&_type=json&mapX=${infoData.mapx}&mapY=${infoData.mapy}&radius=5000&arrange=E`
        );
        const json = await response.json();
        const items = json.response?.body?.items?.item ?? [];
        setNearby(items.filter((e) => e.contentid !== infoData.contentid).slice(0, 8));
      } catch (e) {
        // 무료 공개 API라 실패해도 조용히 무시하고 안내를 숨긴다.
        setNearby([]);
      }
    };
    getNearby();
  }, [infoData?.contentid]);

  const getTravelInfo = async (id) => {
    try {
      const response = await fetch(
        `https://apis.data.go.kr/B551011/KorService2/detailCommon2?serviceKey=${process.env.VITE_TOUR_API_KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${id}`
      );
      const json = await response.json();
      const data = json.response?.body?.items?.item ?? [];
      if (data.length === 0) {
        toast.error("존재하지 않는 관광지입니다.");
        history.back();
        return;
      }
      // 관광지 본문 정보는 여기서 바로 보여주고, 좋아요 수는 별도로 시도한다.
      // 좋아요 수 조회(백엔드)가 실패해도 이미 받아온 본문 정보는 그대로 보여줘야 한다.
      setInfoData({ ...data[0], likeCount: 0 });
      try {
        const likeCount = await axios.get(`http://localhost:8080/getLikeCount/${data[0].contentid}`);
        setInfoData((prev) => ({ ...prev, likeCount: likeCount.data.data }));
      } catch (e) {
        // 좋아요 수는 부가 정보라 실패해도 무시한다.
      }
    } catch (e) {
      toast.error("관광지 정보를 불러오지 못했습니다.");
    }
  };

  const writing = async (id) => {
    if (!sessionStorage.getItem("access_token")) {
      toast.info("로그인 후 이용해 주세요");
      return;
    }
    if (window.confirm("등록하시겠습니까?")) {
      try {
        await axios.post("http://localhost:8080/addComment", { id, content, type: "T" });
        getcontent();
        toast.success("댓글 추가 성공");
        setContent("");
      } catch (e) {
        toast.error(e.response.data.msg);
      }
    }
  };

  useEffect(() => {
    getcontent();
    getLikes();
  }, []);

  const getcontent = async () => {
    const data = await axios.get(`http://localhost:8080/getComment?id=${location.search.split("=")[1]}`);
    setComments(data.data.data.filter((e) => e.type === "T"));
  };

  // 상세 정보용 찜하기 기능
  const onDibs = () => {
    if (sessionStorage.getItem("dibs")) {
      // 세션 스토리지에 찜하기 스토리지가 있으면
      const dibs = sessionStorage.getItem("dibs").split(" ");
      const filterDibs = dibs.filter((id) => id === location.search.split("=")[1]);
      if (filterDibs.length === 0) {
        // 현재 세션 스토리지 해당 값이 없으면 
        sessionStorage.setItem("dibs", sessionStorage.getItem("dibs") + location.search.split("=")[1] + " ");
      } else {
        const dibs = sessionStorage.getItem("dibs");
        sessionStorage.setItem("dibs", dibs.replace(location.search.split("=")[1] + " ", ""));
      }
    } else {
      // 없으면
      sessionStorage.setItem("dibs", location.search.split("=")[1] + " ");
    }
    setDibs(!dibs);
  };

  //좋아요 불러오기
  const getLikes = async () => {
    const data = await axios.post("http://localhost:8080/getLikes");
    if (data === undefined) {
      getLikes();
    } else {
      setLike(data.data.data.filter((e) => e.type === "T"));
    }
  };

  // 좋아요 추가
  const addLikes = async (id) => {
    try {
      if (like.filter((e) => e.id === id).length) {
        // 있으면
        await axios.delete(`http://localhost:8080/removeLikes/${id}`);
        setInfoData({ ...infoData, likeCount: infoData.likeCount - 1 });
      } else {
        await axios.post("http://localhost:8080/addLikes", { id: id, type: "T" });
        setInfoData({ ...infoData, likeCount: infoData.likeCount + 1 });
      }
      getLikes();
    } catch (e) {
      toast.info("로그인 후 이용해 주세요.");
    }
  };

  if (!infoData) {
    // 모든 hook을 먼저 호출한 뒤에 조건부 리턴해야 hooks 규칙을 어기지 않는다.
    return <Spinner text="관광지 정보를 불러오는 중입니다..." padding="150px 0" />;
  }

  return (
    <MarginTopWrapper margin>
      <Styles.TitleBox>
        <Styles.Title>{infoData?.title}</Styles.Title>
      </Styles.TitleBox>
      <Styles.LikeBox>
        <Styles.Img1></Styles.Img1>
        <Styles.HeartBox>
          {like.filter((e) => e.id === location.search.split("=")[1]).length ? (
            <HeartFilled style={{ color: "red", fontSize: "30px" }} onClick={() => addLikes(location.search.split("=")[1])} />
          ) : (
            <HeartOutlined style={{ fontSize: "30px" }} onClick={() => addLikes(location.search.split("=")[1])} />
          )}
          <Styles.LikeCount>{infoData?.likeCount}</Styles.LikeCount>
        </Styles.HeartBox>
        <Styles.Like
          onClick={onDibs}
          dibs={
            sessionStorage.getItem("dibs")
              ? sessionStorage
                  .getItem("dibs")
                  .split(" ")
                  .filter((id) => id === location.search.split("=")[1]).length === 0
                ? true
                : false
              : true
          }>
          {sessionStorage.getItem("dibs")
            ? sessionStorage
                .getItem("dibs")
                .split(" ")
                .filter((id) => id === location.search.split("=")[1]).length === 0
              ? "+찜하기"
              : "-찜 취소"
            : "+찜하기"}
        </Styles.Like>
      </Styles.LikeBox>
      <Styles.TopBar />
      <Styles.TitleImgBox>
        <Styles.Titleimage src={infoData?.firstimage === "" ? "assets/logo.png" : infoData?.firstimage} />
      </Styles.TitleImgBox>
      <Styles.InformationBox>
        <Styles.InformationTitle>상세정보</Styles.InformationTitle>
        <Styles.InformationBar />
        <Styles.InformationContnet>
          <div dangerouslySetInnerHTML={{ __html: infoData?.overview }}></div>
        </Styles.InformationContnet>
        <Styles.Map>
          <Map lon={infoData?.mapx} lat={infoData?.mapy} />
        </Styles.Map>
        <Styles.DetailedInforBox>
          <Styles.DetaBox>
            <Styles.DetaFontBox>
              <Styles.DetaFont>● 전화번호</Styles.DetaFont>
              <Styles.DetainforMation>{infoData?.tel === "" ? "조회하지 못함" : infoData?.tel}</Styles.DetainforMation>
            </Styles.DetaFontBox>
            <Styles.DetaFontBox>
              <Styles.DetaFont>● 주소</Styles.DetaFont>
              <Styles.DetainforMation>{infoData?.addr1 + " " + infoData?.addr2}</Styles.DetainforMation>
            </Styles.DetaFontBox>
            <Styles.DetaFontBox>
              <Styles.DetaFont>● 우편주소</Styles.DetaFont>
              <Styles.DetainforMation>{infoData?.zipcode}</Styles.DetainforMation>
            </Styles.DetaFontBox>
            <Styles.DetaFontBox>
              <Styles.DetaFont>● 홈페이지</Styles.DetaFont>
              <Styles.DetainfoRight>
                <div dangerouslySetInnerHTML={{ __html: infoData?.homepage }}></div>
              </Styles.DetainfoRight>
            </Styles.DetaFontBox>
          </Styles.DetaBox>
        </Styles.DetailedInforBox>
      </Styles.InformationBox>
      {nearby.length > 0 && (
        <Styles.NearbyBox>
          <Styles.Title1>주변 추천</Styles.Title1>
          <Styles.NearbyScroll>
            {nearby.map((place) => (
              <Styles.NearbyCard key={place.contentid} onClick={() => navigate(`/information?id=${place.contentid}`)}>
                <Styles.NearbyImg src={place.firstimage ? place.firstimage : place.firstimage2 ? place.firstimage2 : "assets/logo.png"} />
                <Styles.NearbyName>{place.title}</Styles.NearbyName>
                <Styles.NearbyAddr>{place.addr1}</Styles.NearbyAddr>
                {place.dist && <Styles.NearbyDist>{(place.dist / 1000).toFixed(1)}km</Styles.NearbyDist>}
              </Styles.NearbyCard>
            ))}
          </Styles.NearbyScroll>
        </Styles.NearbyBox>
      )}
      <Styles.Comment1>
        <Styles.Title1>톡톡</Styles.Title1>
        <Styles.CommentBox>
          {comments.map((el, idx) => {
            return (
              <Styles.ReviewBox key={idx}>
                <Styles.ReImage
                  src={el.email.profileImg === "" ? "assets/defaultProfile.png" : `http://localhost:8080/image/view?value=${el.email.profileImg}`}
                />
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
            <Styles.Profile1
              src={
                sessionStorage.getItem("profileImg")
                  ? `http://localhost:8080/image/view?value=${sessionStorage.getItem("profileImg")}`
                  : "assets/defaultProfile.png"
              }
            />
            <Styles.InputComment placeholder="댓글 입력" onChange={(e) => setContent(e.target.value)} value={content || ""} />
            <Styles.InputBtn
              onClick={() => {
                writing(location.search.split("=")[1]);
              }}>
              등록
            </Styles.InputBtn>
          </Styles.InputBox>
        </Styles.CommentBox>
      </Styles.Comment1>
    </MarginTopWrapper>
  );
};
export default InformationPage;
