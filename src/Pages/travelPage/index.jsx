import React, { useEffect, useState, useRef } from "react";
import * as Styles from "./style";
import { MarginTopWrapper } from "../../Common/style";
import Paging from "../../Components/paging";
import { useNavigate, useLocation } from "react-router-dom";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import Spinner from "../../Common/Spinner";
import axios from "axios";
import { searchNearbyFallback } from "../../utils/nearbySearch";
import { useLikes } from "../../hooks/useLikes";


const TravelPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1); // 페이지번호
  const [itemsCount] = useState(10); // 페이지 당 관광지 수
  const [totalItemsCount, setTotalItemCount] = useState(0); // 총 아이템 개수 설정
  const [tours, setTours] = useState([]);
  const [storagetours, setStorageTours] = useState([]); // 전체 관광지
  const [searchKeyword, setSearchKeyword] = useState(""); // 키워드
  const pagingHook = useRef(false);
  const searchInputRef = useRef(null);
  const [dibs, setDibs] = useState(false); // 찜 이벤트를 할때마다 렌더링이 되지 않아 업데이트가 안됨 따라서 생성
  const { isLiked, toggleLike, reloadLikes } = useLikes("T");
  const [rendering, setRendering] = useState(false);
  const location = useLocation(); //mainPage 받아온 키워드 값
  const { state } = location;

  // TourAPI contentTypeId: 12 관광지 / 39 음식점 / 32 숙박
  const [contentType, setContentType] = useState("12");
  const categoryTabs = [
    { id: "12", label: "관광지" },
    { id: "39", label: "음식점" },
    { id: "32", label: "숙박" },
  ];

  useEffect(() => {
    // location.search에 의존해야 이 페이지 안에서 다시 검색해도(같은 라우트,
    // 쿼리스트링만 바뀜) 재조회가 된다. 기존엔 []로 마운트 시 1회만 실행되고
    // tours.length===0 일때만 조회해서, 첫 조회 이후로는 재검색이 반영되지 않았다.
    // contentType도 같이 봐야 카테고리 탭을 바꿨을 때 다시 조회된다.
    const search = location.search.split("="); // url 에 있는 search 를 가져옴
    window.scroll(0, 0);
    if (search[0] === '?search') {
      tourData(decodeURI(search[1]));
    } else {
      tourData();
    }
    setSearchKeyword(search[1] === undefined ? '전체' : decodeURI(search[1]));
  }, [location.search, contentType]);

  useEffect(() => {
    reloadLikes();
  }, []);

  useEffect(() => {
    if (pagingHook.current) {
      window.scroll(0, 0);
    } else {
      pagingHook.current = true;
    }
  }, [page]);

  const tourData = (search) => {
    // 전체 조회 / 키워드 검색 함수
    setRendering(false);
    (async () => {
      try {
        const isSearch = search !== undefined && search !== null && search !== "";
        // 검색어가 있을 땐 전체 목록을 받아와 주소로만 거르는 대신,
        // TourAPI의 이름 기반 검색 엔드포인트(searchKeyword2)를 직접 사용한다.
        // (구 버전 KorService/areaBasedSyncList, searchKeyword는 서비스가 폐기되어 KorService2로 이전됨)
        const endpoint = isSearch ? "searchKeyword2" : "areaBasedList2";
        const keywordParam = isSearch ? `&keyword=${encodeURIComponent(search)}` : "";
        const response = await fetch(
          `https://apis.data.go.kr/B551011/KorService2/${endpoint}?serviceKey=${process.env.VITE_TOUR_API_KEY}&numOfRows=100000&MobileOS=ETC&MobileApp=AppTest&_type=json&contentTypeId=${contentType}${keywordParam}`
        );
        const json = await response.json();
        let tourItems = json.response?.body?.items?.item ?? []; // 검색 결과가 없으면 items가 빈 문자열로 온다

        if (isSearch && tourItems.length === 0) {
          // "용산역"처럼 관광지/음식점 이름과 정확히 일치하지 않는 검색어는 결과가 0건이 된다.
          // 좌표로 변환해서 그 주변 결과라도 보여준다.
          const { items, usedFallback } = await searchNearbyFallback(search, contentType);
          tourItems = items;
          if (usedFallback) {
            toast.info(`"${search}"와 일치하는 결과가 없어 주변 결과를 보여드려요.`);
          }
        }

        setStorageTours(tourItems);
        setPage(1);
        setTours(tourItems);
        setTotalItemCount(tourItems.length);
      } catch (e) {
        toast.error("관광지 정보를 불러오지 못했습니다.");
      } finally {
        // 실패해도 여기서 로딩을 꺼줘야 스피너가 멈추지 않고 영원히 도는 걸 막는다.
        setRendering(true);
      }
    })();
  };
  const handleOnKeyPress = (e) => {
    // 검색 함수
    if (e.key === "Enter") {
      // window.open(..., '_self')로 origin 기준 절대경로를 새로 만들면
      // base path(/travel-planner/)가 빠져 배포 환경에서 404가 난다.
      // 라우터의 navigate를 써야 base path가 자동으로 유지된다.
      navigate(`/travel?search=${e.target.value}`);
    }
  };

  const infoMove = async (e) => {
    //상세정보 함수
    navigate(`/information?id=${e}`);
  };

  // 찜하기 이벤트
  const onDibs = (tour) => {
    setDibs(!dibs);
    if (sessionStorage.getItem("dibs")) {
      // 세션 스토리지에 찜하기 스토리지가 있으면
      const dibs = sessionStorage.getItem("dibs").split(" ");
      const filterDibs = dibs.filter((id) => id === tour.contentid);
      if (filterDibs.length === 0) {
        // 현재 세션 스토리지 해당 값이 없으면
        sessionStorage.setItem("dibs", sessionStorage.getItem("dibs") + tour.contentid + " ");
      } else {
        const dibs = sessionStorage.getItem("dibs");
        sessionStorage.setItem("dibs", dibs.replace(tour.contentid + " ", ""));
      }
    } else {
      // 없으면
      sessionStorage.setItem("dibs", tour.contentid + " ");
    }
  };

  const goCreatePlanPage = () => {
    toast.info("로그인 후 이용해 주세요.");
    navigate("/login");
  };

  return (
    <MarginTopWrapper margin>
      <Styles.SearchHeader>
        <Styles.SearchTitle>어디로 떠나볼까요?</Styles.SearchTitle>
        <Styles.InputBox>
          <Styles.Input placeholder="검색하세요." ref={searchInputRef} onKeyUp={handleOnKeyPress} />
          <Styles.SearchBtn onClick={() => navigate(`/travel?search=${searchInputRef.current?.value ?? ""}`)}>
            <SearchIcon />
          </Styles.SearchBtn>
        </Styles.InputBox>
        <Styles.CategoryTabBox>
          {categoryTabs.map((tab) => (
            <Styles.CategoryTab key={tab.id} active={contentType === tab.id} onClick={() => setContentType(tab.id)}>
              {tab.label}
            </Styles.CategoryTab>
          ))}
        </Styles.CategoryTabBox>
      </Styles.SearchHeader>
      <Styles.ListSumBox>{searchKeyword === null || searchKeyword === "" ? "#전체" : `#${searchKeyword}`}</Styles.ListSumBox>
      <Styles.ContentBox>
        <Styles.TravelListBox>
          {!rendering ? (
            <Spinner text="관광지를 불러오는 중입니다..." />
          ) : tours.length === 0 ? (
            <Styles.Txt>
              <Styles.PlaceTitle>{searchKeyword}" 에 대한 검색결과가 없습니다.</Styles.PlaceTitle>
            </Styles.Txt>
          ) : (
            tours
              .filter((e, index) => {
                if (index >= (page - 1) * itemsCount && index < page * itemsCount) return e;
              })
              .map((tour, idx) => {
                return (
                  <div key={idx}>
                    <Styles.TravelWrapper>
                      <Styles.Image src={tour.firstimage ? tour.firstimage : tour.firstimage2 ? tour.firstimage2 : "assets/logo.png"} onClick={() => infoMove(tour.contentid)} />
                      <Styles.Txt>
                        <Styles.PlaceTitle onClick={() => infoMove(tour.contentid)}>{tour.title}</Styles.PlaceTitle>
                        <Styles.Address>{tour.addr1}</Styles.Address>
                        <Styles.Tel>{tour.tel}</Styles.Tel>
                      </Styles.Txt>
                      <Styles.LikeBox>
                        {isLiked(tour.contentid) ? (
                          <HeartFilled style={{ color: "var(--color-accent)", fontSize: "26px" }} onClick={() => toggleLike(tour.contentid)} />
                        ) : (
                          <HeartOutlined style={{ color: "var(--color-text-muted)", fontSize: "26px" }} onClick={() => toggleLike(tour.contentid)} />
                        )}
                        <Styles.Like
                          onClick={() => onDibs(tour)}
                          dibs={
                            sessionStorage.getItem("dibs")
                              ? sessionStorage
                                  .getItem("dibs")
                                  .split(" ")
                                  .filter((id) => id === tour.contentid).length === 0
                                ? true
                                : false
                              : true
                          }>
                          {sessionStorage.getItem("dibs")
                            ? sessionStorage
                                .getItem("dibs")
                                .split(" ")
                                .filter((id) => id === tour.contentid).length === 0
                              ? "+찜하기"
                              : "-찜 취소"
                            : "+찜하기"}
                        </Styles.Like>
                      </Styles.LikeBox>
                    </Styles.TravelWrapper>
                  </div>
                );
              })
          )}
        </Styles.TravelListBox>
      </Styles.ContentBox>
      <Paging page={page} count={totalItemsCount} setPage={setPage} itemsCount={itemsCount} />
      {rendering && sessionStorage.getItem("dibs") && (
        <Styles.FabButton onClick={() => (sessionStorage.getItem("access_token") ? navigate("/CreatePlanPage") : goCreatePlanPage())}>
          <SuitcaseIcon /> 찜한 여행지로 플랜 만들기
        </Styles.FabButton>
      )}
    </MarginTopWrapper>
  );
};

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2.2" />
    <path d="M21 21l-4.3-4.3" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const SuitcaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 7V5.5A1.5 1.5 0 019.5 4h5A1.5 1.5 0 0116 5.5V7" stroke="currentColor" strokeWidth="2" />
    <path d="M3 12h18" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export default TravelPage;
