import moment from "moment/moment";
import "react-calendar/dist/Calendar.css";
import React, { useState, useEffect, useRef, useMemo } from "react";
import * as Styles from "./style";
import Map from "../../Components/naverMap";
import Paging from "../../Components/paging";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../Common/Spinner";
import { searchNearbyFallback, fetchNearbyTours } from "../../utils/nearbySearch";
import { generateAutoPlan } from "../../utils/autoPlanner";
import { fetchVisitorDemand, fetchVisitorDemandMap, getHeatTier } from "../../utils/visitorDemand";
import { getTourDetailUrl } from "../../utils/tourApi";
import { getErrorMessage } from "../../utils/errorMessage";

const CreatePlanCalendar = ({ open, setOpen, setDateList }) => {
  // 팝업
  const [value, onChange] = useState(new Date());

  // react-calendar는 selectRange일 때 allowPartialRange가 없으면 "출발일만 고른"
  // 첫 클릭 상태를 내부 state로만 들고 있고 onChange(우리 value)를 호출하지 않는다.
  // 그래서 범위를 다 고른 뒤 새로 날짜를 찍으면 화면(달력)은 바뀌는데 우리 value는
  // 그대로라 상단 요약문이 이전 값으로 멈춰있는 버그가 있었다. allowPartialRange로
  // 첫 클릭도 [date] 배열로 onChange가 오게 해서 우리 value와 항상 동기화되게 한다.
  const isRangeComplete = Array.isArray(value) && value.length === 2;
  const startDate = Array.isArray(value) ? value[0] : value;

  // 지금 고른 범위를 사람이 읽기 쉬운 문장으로 보여준다 (반응성/가독성 개선)
  const renderSelectionSummary = () => {
    if (isRangeComplete) {
      const nights = moment(value[1]).diff(moment(value[0]), "days");
      return `${moment(value[0]).format("M월 D일(ddd)")} ~ ${moment(value[1]).format("M월 D일(ddd)")} · ${nights}박 ${nights + 1}일`;
    }
    return `출발일 ${moment(startDate).format("M월 D일(ddd)")} 선택됨 — 도착일을 선택해주세요`;
  };

  // 이전 버튼을 눌렀을 때
  const onBack = () => {
    window.history.back();
  };

  const getApply = () => {
    // 클릭을 안했을때 (당일로 여행을 가서 바로 적용을 눌렀을때)
    if (!isRangeComplete) {
      setDateList([startDate]);
      setOpen(false);
      return;
    }

    // 날짜 사이 일 수 구함
    const diffDate = value[0].getTime() - value[1].getTime();
    const dateN = Math.ceil(Math.abs(diffDate / (1000 * 60 * 60 * 24)));

    const dateArr = [value[0]];

    // 오늘보다 이전 날짜면 끝냄
    if (dateArr[0] < new Date().setHours(0, 0, 0, 0)) {
      // 시간을 0으로 초기화
      toast.error("현재 날짜 이후로 선택해주세요.");
      onChange(new Date());
      return;
    }

    // 반복문을 이용해 내일을 구하고 또 내일내일을 구하는 식으로 리스트를 만듦
    for (let i = 0; i < dateN - 1; i++) {
      const date = dateArr[dateArr.length - 1];
      const tomorrow = new Date(date);
      tomorrow.setDate(tomorrow.getDate() + 1);

      dateArr.push(tomorrow);
    }

    setDateList(dateArr);
    setOpen(false);
  };

  return (
    <Styles.ModalCustom isOpen={open} style={{ overlay: { zIndex: "1", backgroundColor: "rgba(20, 20, 30, 0.5)" } }} ariaHideApp={false}>
      <Styles.ModalTitle>여행 날짜를 선택해주세요</Styles.ModalTitle>
      <Styles.SelectionSummary complete={isRangeComplete}>{renderSelectionSummary()}</Styles.SelectionSummary>
      <Styles.CalendarCustom onChange={onChange} value={value} selectRange allowPartialRange />
      <Styles.BtnBox>
        <Styles.Btn onClick={onBack}>이전</Styles.Btn>
        <Styles.Btn primary onClick={() => getApply()}>적용하기</Styles.Btn>
      </Styles.BtnBox>
    </Styles.ModalCustom>
  );
};

const CreatePlanPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(true); //날짜 모달
  const [dateList, setDateList] = useState();

  // AI 자동 플래너 (목적지 키워드만 주면 TourAPI 데이터로 일정을 규칙 기반으로 채워준다)
  const [autoPlanOpen, setAutoPlanOpen] = useState(false);
  const [autoPlanKeyword, setAutoPlanKeyword] = useState("");
  const [autoPlanLoading, setAutoPlanLoading] = useState(false);

  // 플랜명 입력 모달 (기존엔 브라우저 기본 prompt()를 썼음)
  const [planNameOpen, setPlanNameOpen] = useState(false);
  const [planName, setPlanName] = useState("");

  const runAutoPlan = async () => {
    if (!autoPlanKeyword.trim()) {
      toast.error("여행지를 입력해주세요.");
      return;
    }
    const hasExistingStops = dayList?.some((day) => day[1].length > 0);
    if (hasExistingStops && !window.confirm("기존에 담아둔 일정이 모두 새 일정으로 교체됩니다. 계속할까요?")) {
      return;
    }
    setAutoPlanLoading(true);
    try {
      const result = await generateAutoPlan({ keyword: autoPlanKeyword.trim(), numDays: dateList.length });
      if (!result) {
        toast.error(`"${autoPlanKeyword}" 주변에서 추천할 장소를 찾지 못했어요.`);
        return;
      }
      setDayList(result);
      setAutoPlanOpen(false);
      setAutoPlanKeyword("");
    } catch (e) {
      toast.error("자동 일정 생성에 실패했습니다.");
    } finally {
      setAutoPlanLoading(false);
    }
  };

  //박스를 움직이게 하는 state
  const [controlOpen, setControlOpen] = useState(false); // Control
  const [travelOpen, setTravelOpen] = useState(false); // Travel

  const [update, setUpdate] = useState(null);

  // 추천 여행지 페이지네이션
  const [page1, setPage1] = useState(1);
  const [itemsCount] = useState(6);
  const [totalItemsCount1, setTotalItemsCount1] = useState(50); 

  // 찜한 여행지 페이지네이션
  const [page2, setPage2] = useState(1);
  const [itemsCount2] = useState(6);
  const [totalItemsCount2, setTotalItemsCount2] = useState(50); 

  // 페이지 이동 시 마커 삭제
  const pagingHook = useRef(false);

  // 마커 클릭 시 지도
  const [coordinate, setCoordinate] = useState([]); // 좌표
  const [dayMarkerOpen, setDayMarkerOpen] = useState(); // 추가한 관광지 지도 마커
  const [searchMarkerOpen, setSearchMarkerOpen] = useState(); // 전체 관광지 지도 마커
  const [dibsMarkerOpen, setDibsMarkerOpen] = useState(); // 찜하기 관광지 지도 마커

  // 관광지
  // TourAPI contentTypeId: 12 관광지 / 39 음식점 / 32 숙박
  const [contentType, setContentType] = useState("12");
  const categoryTabs = [
    { id: "12", label: "관광지" },
    { id: "39", label: "음식점" },
    { id: "32", label: "숙박" },
  ];

  // TourAPI cat1(대분류) 기준 세부 필터. 이미 받아온 목록을 클라이언트에서
  // 한 번 더 걸러내는 방식이라 API를 추가로 호출하지 않는다.
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCats, setSelectedCats] = useState([]);
  const catOptions = [
    { id: "A01", label: "자연" },
    { id: "A02", label: "인문" },
    { id: "A03", label: "레포츠" },
    { id: "A04", label: "쇼핑" },
    { id: "A05", label: "음식" },
  ];
  const toggleCat = (id) => {
    setSelectedCats((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
    setPage1(1);
  };
  const [searchKeyword, setSearchKeyword] = useState(""); // 키워드
  const travelInputRef = useRef(null);
  const [tourStorage, setTourStorage] = useState(); // 전체 관광지
  const [tours, setTours] = useState([]); // 키워드 검색 결과 관광지
  const visibleTours = selectedCats.length === 0 ? tours : tours.filter((t) => selectedCats.includes(t.cat1));

  // 기본 목록(검색 전)을 핫플레이스(지역 방문자수) 순으로 보여주기 위한 캐시.
  // 카테고리 탭을 바꿀 때마다 다시 조회하지 않도록 프로미스를 재사용한다.
  const [demandMap, setDemandMap] = useState(new window.Map()); // Map: 이 파일에서 import한 네이버지도 컴포넌트 이름과 겹쳐서 window.Map으로 명시
  const demandMapPromiseRef = useRef(null);
  const getVisitorDemandMap = () => {
    if (!demandMapPromiseRef.current) {
      demandMapPromiseRef.current = fetchVisitorDemandMap().then((map) => {
        setDemandMap(map);
        return map;
      });
    }
    return demandMapPromiseRef.current;
  };
  const visitorCountOf = (tour) => demandMap.get(`${tour.lDongRegnCd}${tour.lDongSignguCd}`)?.visitor;
  const [cart, setCart] = useState([]); // 찜
  const [dayList, setDayList] = useState(); // 총 일정목록

  // 방금 추가한 장소 근처의 다른 가볼만한 곳 추천 (TourAPI 위치기반 조회, tourInfoPage
  // "주변 추천"과 동일한 방식) - 관광지를 하나 추가할 때마다 그 장소를 기준으로 갱신된다.
  const [nearbyAnchor, setNearbyAnchor] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [nearbyLoading, setNearbyLoading] = useState(false);
  const [nearbyPage, setNearbyPage] = useState(1);
  const [nearbyItemsCount] = useState(6);
  useEffect(() => {
    setNearbyPage(1); // 기준 장소가 바뀌면 페이지도 1페이지로 초기화
    if (!nearbyAnchor) {
      setNearbyPlaces([]);
      return;
    }
    setNearbyLoading(true);
    fetchNearbyTours(nearbyAnchor.mapy, nearbyAnchor.mapx, undefined, 5000)
      .then((items) => {
        // 자기 자신과, 이미 이 DAY에 추가된 곳은 추천에서 뺀다.
        const alreadyAdded = new Set((dayList?.[update - 1]?.[1] ?? []).map((s) => s.contentid));
        alreadyAdded.add(nearbyAnchor.contentid);
        // 너무 많으면 페이지 수가 끝없이 늘어나니 최대 60개(10페이지)까지만 보여준다.
        setNearbyPlaces(items.filter((it) => !alreadyAdded.has(it.contentid)).slice(0, 60));
      })
      .catch(() => setNearbyPlaces([]))
      .finally(() => setNearbyLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nearbyAnchor]);

  const [isUpdate, setIsUpdate] = useState(false);
  const [rendering, setRendering] = useState(false); // 찜 로딩
  const [rendering2, setRendering2] = useState(false); // 전체 여행지 로딩

  useEffect(() => {
    // 새로고침 방지 alert
    tourData();
    window.onbeforeunload = function () {
      return true;
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  // 수정인지 생성인지 구분
  useEffect(() => {
    if (location.state) {
      setIsModalOpen(false);
      setIsUpdate(true);
      const date = location.state.updateData.date.split("~");
      const dateArr = [];
      let firstDate = new Date(date[0]);
      while (firstDate <= new Date(date[1])) {
        dateArr.push(new Date(firstDate));
        firstDate.setDate(firstDate.getDate() + 1);
      }
      setDateList(dateArr);
    }
  }, []);

  const loadDibsData = () => {
    // 찜 목록 불러오는 함수
    if (sessionStorage.getItem("dibs")) {
      const dibs = sessionStorage.getItem("dibs").split(" ");
      dibs.pop(); // 쓰레기 값 제거
      tourData2(dibs).then((value) => setCart(value));
    } else {
      setCart([]);
      setRendering(true);
    }
  };

  useEffect(() => {
    loadDibsData();
    // 관광지 상세페이지는 새 탭(window.open)으로 열리기 때문에, 거기서 찜하기를
    // 눌러도 이 탭은 리마운트되지 않아 찜 목록이 그대로 안 바뀐다.
    // 탭이 다시 보일 때(다른 탭에서 돌아왔을 때) 찜 목록을 다시 불러온다.
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        loadDibsData();
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  useEffect(() => {
    if (dateList !== undefined) {
      let arr = [];
      for (let i = 0; i < dateList.length; i++) {
        arr[i] = [i + 1, []];
      }
      setDayList(arr);
      setControlOpen(true); // 날짜 선택이 끝나면 바로 일정 패널을 열어준다
    }
  }, [dateList]);

  // 하루 일정에 추가한 장소 사이의 이동거리/시간 안내 + 지도에 그릴 이동 경로선 (OSRM 무료 라우팅 API)
  const [routeLegs, setRouteLegs] = useState([]);
  const [routePath, setRoutePath] = useState([]); // 지도에 그릴 실제 경로 좌표([lat,lon] 배열)
  useEffect(() => {
    const getRouteLegs = async () => {
      if (!update || !dayList || !dayList[update - 1]) {
        setRouteLegs([]);
        setRoutePath([]);
        return;
      }
      const stops = dayList[update - 1][1];
      if (stops.length < 2) {
        setRouteLegs([]);
        setRoutePath([]);
        return;
      }
      try {
        const coords = stops.map((s) => `${s.mapx},${s.mapy}`).join(";");
        const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`);
        const json = await response.json();
        setRouteLegs(json.routes?.[0]?.legs ?? []);
        // OSRM geometry는 [lon, lat] 순서라 지도(naver maps)가 쓰는 [lat, lon]으로 뒤집는다.
        setRoutePath((json.routes?.[0]?.geometry?.coordinates ?? []).map(([lon, lat]) => [lat, lon]));
      } catch (e) {
        // 무료 공개 데모 서버라 실패해도 조용히 무시하고 안내를 숨긴다.
        setRouteLegs([]);
        setRoutePath([]);
      }
    };
    getRouteLegs();
  }, [dayList, update]);

  // 지도에 표시할 현재 DAY의 방문 순서 번호 마커 (경로선과 함께 보여줄 때만 사용)
  const dayRouteMarkers = useMemo(() => {
    if (!update || !dayList || !dayList[update - 1]) return null;
    const stops = dayList[update - 1][1];
    if (stops.length < 2) return null;
    return stops.map((s) => ({ lat: s.mapy, lon: s.mapx }));
  }, [dayList, update]);

  // Day별 날씨 안내 (무료 공개 API, 키 발급 불필요)
  const [dayWeather, setDayWeather] = useState({});
  useEffect(() => {
    if (!dayList || !dateList) return;
    const getDayWeather = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const maxDate = new Date(today);
      maxDate.setDate(maxDate.getDate() + 15); // Open-Meteo 무료 예보 범위(약 16일)

      const results = {};
      await Promise.all(
        dayList.map(async (day, idx) => {
          const stops = day[1];
          if (!stops || stops.length === 0) return;
          const { mapy: lat, mapx: lon } = stops[0];
          // "서울특별시 용산구 ..." 형태의 주소에서 시/군/구만 뽑아 날씨 옆에 어느 지역인지 표시한다.
          const addrParts = stops[0].addr1 ? stops[0].addr1.split(" ") : [];
          const region = addrParts[1] || addrParts[0] || "";
          results[idx] = { region };

          // 이 지역이 최근(통신사 데이터 집계 특성상 약 3~4주 전 기준) 얼마나 붐볐는지 -
          // "핫플레이스" 표시용. 여행 날짜(미래/과거)와 무관하게 항상 조회한다.
          const demand = await fetchVisitorDemand(stops[0].lDongRegnCd, stops[0].lDongSignguCd);
          if (demand?.visitor != null) {
            results[idx] = { ...results[idx], demand };
          }

          const date = dateList[idx];
          if (!date || date < today || date > maxDate) return;
          const dateStr = moment(date).format("YYYY-MM-DD");
          try {
            const response = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FSeoul&start_date=${dateStr}&end_date=${dateStr}`
            );
            const json = await response.json();
            if (json.daily?.time?.length) {
              results[idx] = {
                ...results[idx],
                code: json.daily.weathercode[0],
                tmax: Math.round(json.daily.temperature_2m_max[0]),
                tmin: Math.round(json.daily.temperature_2m_min[0]),
              };
            }
          } catch (e) {
            // 무료 공개 API라 실패해도 조용히 무시하고 안내를 숨긴다.
          }
          // 미세먼지(PM2.5) 정보도 같은 좌표/날짜로 조회 (Open-Meteo 대기질 API, 무료·키 불필요)
          try {
            const aqResponse = await fetch(
              `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm2_5&timezone=Asia%2FSeoul&start_date=${dateStr}&end_date=${dateStr}`
            );
            const aqJson = await aqResponse.json();
            const pm25List = (aqJson.hourly?.pm2_5 ?? []).filter((v) => v != null);
            if (pm25List.length > 0) {
              const avgPm25 = pm25List.reduce((a, b) => a + b, 0) / pm25List.length;
              results[idx] = { ...(results[idx] ?? {}), pm25: Math.round(avgPm25) };
            }
          } catch (e) {
            // 무료 공개 API라 실패해도 조용히 무시하고 안내를 숨긴다.
          }
        })
      );
      setDayWeather(results);
    };
    getDayWeather();
  }, [dayList, dateList]);

  const weatherIcon = (code) => {
    if (code === 0) return "☀️";
    if ([1, 2, 3].includes(code)) return "⛅";
    if ([45, 48].includes(code)) return "🌫️";
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "🌧️";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "🌨️";
    if ([95, 96, 99].includes(code)) return "⛈️";
    return "🌡️";
  };

  // 대기질 등급 (한국 환경부 PM2.5 기준: 좋음/보통/나쁨/매우나쁨)
  const pm25Grade = (pm25) => {
    if (pm25 <= 15) return { label: "좋음", icon: "🟢" };
    if (pm25 <= 35) return { label: "보통", icon: "🟡" };
    if (pm25 <= 75) return { label: "나쁨", icon: "🟠" };
    return { label: "매우나쁨", icon: "🔴" };
  };

  // 여행 기간 중 방문 지역의 축제/행사 추천 (TourAPI 축제공연행사 정보 조회)
  const [festivals, setFestivals] = useState([]);
  useEffect(() => {
    if (!dayList || !dateList) {
      setFestivals([]);
      return;
    }
    // 어느 Day든 상관없이 먼저 추가된 장소 하나를 "여행 지역" 기준으로 삼는다.
    const anyStop = dayList.map((day) => day[1][0]).find(Boolean);
    if (!anyStop?.areacode) {
      setFestivals([]);
      return;
    }
    const getFestivals = async () => {
      try {
        const start = moment(dateList[0]).format("YYYYMMDD");
        const end = moment(dateList[dateList.length - 1]).format("YYYYMMDD");
        const response = await fetch(
          `https://apis.data.go.kr/B551011/KorService2/searchFestival2?serviceKey=${process.env.VITE_TOUR_API_KEY}&numOfRows=10&MobileOS=ETC&MobileApp=AppTest&_type=json&eventStartDate=${start}&eventEndDate=${end}&areaCode=${anyStop.areacode}&arrange=A`
        );
        const json = await response.json();
        setFestivals(json.response?.body?.items?.item ?? []);
      } catch (e) {
        // 무료 공개 API라 실패해도 조용히 무시하고 안내를 숨긴다.
        setFestivals([]);
      }
    };
    getFestivals();
  }, [dayList, dateList]);

  useEffect(() => {
    if (pagingHook.current) {
      setSearchMarkerOpen(Array(totalItemsCount1).fill(false));
    } else {
      pagingHook.current = true;
    }
  }, [page1]);

  useEffect(() => {
    if (pagingHook.current) {
      setDibsMarkerOpen(Array(totalItemsCount2).fill(false));
    } else {
      pagingHook.current = true;
    }
  }, [page2]);

  // 수정 모드 진입 시 기존 플랜 데이터를 dayList에 채워넣는다. dayList가 바뀔 때마다
  // 이 effect가 다시 돌면(관광지를 추가/삭제할 때마다) 매번 원본 데이터로 덮어써버리는
  // 문제가 있었어서, 최초 1회만 실행되도록 막는다.
  const hasLoadedUpdateData = useRef(false);
  useEffect(() => {
    if (dayList && location.state && !hasLoadedUpdateData.current) {
      hasLoadedUpdateData.current = true;
      onUpdateSetDate();
    }
  }, [dayList]);

  const onUpdateSetDate = () => {
    // addTour를 반복 호출하면 각 호출이 effect 실행 시점의 오래된 dayList를 참조해서,
    // 같은 DAY에 항목이 2개 이상이면 마지막 호출 결과로 서로 덮어써버렸다.
    // (updater 함수로 한 번에 전체를 채워넣어야 안전하다.)
    const plans = JSON.parse(location.state.updateData.plan);
    setDayList((prevDayList) =>
      prevDayList.map((day) => {
        const matchingPlanDay = plans.find((p) => p.day === day[0]);
        return matchingPlanDay ? [day[0], matchingPlanDay.list] : day;
      })
    );
  };

  const postPlanData = async (el) => {
    // 플랜
    try {
      if (isUpdate) {
        await axios.put("/updatePlan", { ...el, id: `${location.state.updateData.id}` });
      } else {
        await axios.post("/createPlan", el);
      }
      navigate("/");
    } catch (e) {
      toast.error(getErrorMessage(e));
      navigate("/");
    }
  };

  const cancelDayEdit = (idx) => {
    setUpdate(null);
    setTravelOpen(false);
    setDayMarkerOpen(Array(dayList[idx - 1][1].length).fill(false)); // 취소 시 마커 초기화
    setNearbyAnchor(null); // 다른 DAY의 추천이 남아있지 않도록 초기화
  };

  const onUpdate = (idx) => {
    if (update == null) {
      setUpdate(idx);
      setTravelOpen(true);
      setNearbyAnchor(null);
      // addTour를 한 번도 안 거치고 바로 여러 개가 채워진 DAY(자동 플래너로 채운 경우 등)를
      // 처음 열 때, 마커 표시용 배열이 초기화 안 돼 있으면 렌더링이 깨진다.
      setDayMarkerOpen(Array(dayList[idx - 1][1].length).fill(false));
    } else if (update !== null && update !== idx) {
      toast.error("현재 수정하고 있는 DAY가 있습니다.");
    } else {
      cancelDayEdit(idx);
    }
  };

  // 편집 중에 X(닫기)를 누르면 경고만 띄우고 막던 것을, 편집을 취소하고 바로
  // DAY 목록으로 돌아가도록 바꿔서 뒤로가기가 한 번에 되게 한다.
  const onClose = () => {
    if (update !== null) {
      cancelDayEdit(update);
      return;
    }
    setControlOpen(!controlOpen);
  };

  const tourData = async (overrideType) => {
    // 전체 검색 함수
    setRendering2(false);
    (async () => {
      try {
        const response = await fetch(
          `https://apis.data.go.kr/B551011/KorService2/areaBasedList2?serviceKey=${process.env.VITE_TOUR_API_KEY}&numOfRows=30000&MobileOS=ETC&MobileApp=AppTest&_type=json&contentTypeId=${overrideType ?? contentType}`
        );
        const json = await response.json();
        let tourItems = json.response?.body?.items?.item ?? [];

        // 기본 목록은 가나다순 대신 핫플레이스(방문자수 많은 지역)가 위로 오도록 정렬한다.
        const demandMap = await getVisitorDemandMap();
        tourItems = [...tourItems].sort((a, b) => {
          const aVisitor = demandMap.get(`${a.lDongRegnCd}${a.lDongSignguCd}`)?.visitor ?? -1;
          const bVisitor = demandMap.get(`${b.lDongRegnCd}${b.lDongSignguCd}`)?.visitor ?? -1;
          return bVisitor - aVisitor;
        });

        setTotalItemsCount1(tourItems.length);
        setTours(tourItems);
        setTourStorage(tourItems);
        setPage1(1);
        setSearchMarkerOpen(Array(tourItems.length).fill(false));
      } catch (e) {
        toast.error("여행지 정보를 불러오지 못했습니다.");
      } finally {
        setRendering2(true);
      }
    })();
  };

  const tourData2 = async (idx) => {
    // 찜하기 함수
    setRendering(false);
    let Arr = [];
    try {
      for (let i = 0; i < idx.length; i++) {
        const response = await fetch(getTourDetailUrl(idx[i]));
        const json = await response.json();
        const tourItems = (json.response?.body?.items?.item ?? [])[0];
        Arr[i] = tourItems;
        setTotalItemsCount2(Arr.length);
        setPage2(1);
        setDibsMarkerOpen(Array(Arr.length).fill(false));
      }
    } catch (e) {
      toast.error("찜한 여행지 정보를 불러오지 못했습니다.");
    } finally {
      setRendering(true);
    }
    return Arr;
  };

  const deleteDibs = (el) => {
    // 찜 삭제
    const newCart = cart.filter((c) => c.contentid !== el.contentid);
    setCart(newCart);
    const dibs = sessionStorage.getItem("dibs");
    sessionStorage.setItem("dibs", dibs.replace(el.contentid + " ", ""));
    setTotalItemsCount2(newCart.length);

    // 마지막 페이지의 항목을 지워서 지금 보던 페이지가 사라졌으면 마지막 유효 페이지로 되돌아간다.
    const lastPage = Math.max(1, Math.ceil(newCart.length / itemsCount2));
    if (page2 > lastPage) {
      setPage2(lastPage);
    }
  };

  const searchTours = async (keyword, overrideType) => {
    // 키워드 검색 함수 (이름 기반 TourAPI 검색 사용, 없으면 전체 목록으로 복귀)
    // overrideType: 카테고리 탭을 바꾸는 것과 동시에 재검색할 때, setContentType 직후라
    // contentType state가 아직 리렌더 전이라 옛 값을 참조하게 된다. 그래서 새 값을 직접 받는다.
    if (!keyword) {
      setTours(tourStorage);
      setTotalItemsCount1(tourStorage.length);
      setSearchMarkerOpen(Array(tourStorage.length).fill(false));
      setPage1(1);
      return;
    }
    setRendering2(false);
    try {
      const response = await fetch(
        `https://apis.data.go.kr/B551011/KorService2/searchKeyword2?serviceKey=${process.env.VITE_TOUR_API_KEY}&numOfRows=100000&MobileOS=ETC&MobileApp=AppTest&_type=json&contentTypeId=${overrideType ?? contentType}&keyword=${encodeURIComponent(keyword)}`
      );
      const json = await response.json();
      let tourItems = json.response?.body?.items?.item ?? []; // 검색 결과가 없으면 items가 빈 문자열로 온다

      if (tourItems.length === 0) {
        // "용산역"처럼 관광지/음식점 이름과 정확히 일치하지 않는 검색어는 결과가 0건이 된다.
        // 좌표로 변환해서 그 주변 결과라도 보여준다.
        const { items, usedFallback } = await searchNearbyFallback(keyword, overrideType ?? contentType);
        tourItems = items;
        if (usedFallback) {
          toast.info(`"${keyword}"와 일치하는 결과가 없어 주변 결과를 보여드려요.`);
        }
      }

      setTours(tourItems);
      setTotalItemsCount1(tourItems.length);
      setSearchMarkerOpen(Array(tourItems.length).fill(false));
      setPage1(1);
    } catch (e) {
      toast.error("검색 결과를 불러오지 못했습니다.");
    } finally {
      setRendering2(true);
    }
  };

  const handleOnKeyPress = (e) => {
    // 검색 함수
    if (e.key === "Enter") {
      setSearchKeyword(e.target.value);
      searchTours(e.target.value);
    }
  };

  const handleBlur = (e) => {
    // input창 벗어 날 시 렌더링
    setSearchKeyword(e.target.value);
  };

  const onSubmit = () => {
    // 검색 클릭 함수
    // searchKeyword state는 blur 시점에만 갱신되는데, input에서 바로
    // 검색 버튼을 클릭하면 blur의 setState가 아직 반영되기 전이라
    // 오래된(대부분 빈) 값을 읽게 된다. input의 현재 값을 직접 읽는다.
    const keyword = travelInputRef.current?.value ?? "";
    setSearchKeyword(keyword);
    searchTours(keyword);
  };

  const moveMapLocation = (e, id) => {
    // 마커 클릭 함수
    const coor = e.target.value.split(",");
    const newCoor = { lat: coor[0], lon: coor[1] };
    const num = coor[2];
    if (num == 0) {
      const newArr = searchMarkerOpen.fill(false);
      newArr[id] = true;
      setSearchMarkerOpen(Array(searchMarkerOpen.length).fill(false));
      setDibsMarkerOpen(Array(searchMarkerOpen.length).fill(false));
      setDayMarkerOpen(newArr);
    } else if (num == 1) {
      const newArr = searchMarkerOpen.fill(false);
      newArr[id] = true;
      setDayMarkerOpen(Array(searchMarkerOpen.length).fill(false));
      setDibsMarkerOpen(Array(searchMarkerOpen.length).fill(false));
      setSearchMarkerOpen(newArr);
    } else {
      const newArr = dibsMarkerOpen.fill(false);
      newArr[id] = true;
      setDayMarkerOpen(Array(dibsMarkerOpen.length).fill(false));
      setSearchMarkerOpen(Array(dibsMarkerOpen.length).fill(false));
      setDibsMarkerOpen(newArr);
    }
    setCoordinate(newCoor);
  };

  const addTour = (el, idx) => {
    // 관광지 추가 함수
    if (dayList[idx - 1][1].some((stop) => stop.contentid === el.contentid)) {
      toast.error("이미 해당 날짜에 추가된 관광지입니다.");
      return;
    }
    // dayList를 직접 mutate하고 같은 참조로 setDayList를 부르면 React가
    // 참조 비교로 변경을 감지 못해 이 값을 의존하는 effect(동선 계산 등)가
    // 다시 실행되지 않는다. 매번 새 배열을 만들어 넘겨야 한다.
    const newStops = [...dayList[idx - 1][1], el];
    const newDayList = dayList.map((day, i) => (i === idx - 1 ? [day[0], newStops] : day));
    setDayList(newDayList);
    setDayMarkerOpen(Array(newStops.length).fill(false));
    setNearbyAnchor(el); // 방금 추가한 장소 기준으로 "근처 가볼만한 곳" 갱신
  };

  const removeTour = (idx, idx2) => {
    // 추가한 관광지 삭제 함수
    const newStops = dayList[idx2 - 1][1].filter((_, i) => i !== idx);
    const newDayList = dayList.map((day, i) => (i === idx2 - 1 ? [day[0], newStops] : day));
    setDayList(newDayList);
  };

  const checkTitle = () => {
    // 플랜 확인
    let count = 0;

    for (let i = 0; i < dayList.length; i++) {
      count += dayList[i][1].length;
    }

    if (count < 1) {
      return toast.error("플랜생성 시 관광지 하나 이상을 추가하세요");
    } else {
      setPlanName("");
      setPlanNameOpen(true);
    }
  };

  const confirmPlanName = () => {
    const trimmed = planName.trim();
    if (trimmed.length === 0) {
      return toast.error("플랜명을 입력해주세요.");
    }
    if (trimmed.length > 30) {
      return toast.error("플랜명은 최대 30글자 입니다.");
    }
    setPlanNameOpen(false);
    createPlan(trimmed);
  };

  const createPlan = async (el) => {
    let newArr = [];
    for (let i = 0; i < dayList.length; i++) {
      newArr[i] = { day: i + 1, list: [] };
      for (let j = 0; j < dayList[i][1].length; j++) {
        newArr[i].list[j] = {
          addr1: dayList[i][1][j].addr1,
          addr2: dayList[i][1][j].addr2,
          contentid: dayList[i][1][j].contentid,
          firstimage: dayList[i][1][j].firstimage,
          firstimage2: dayList[i][1][j].firstimage2,
          mapx: dayList[i][1][j].mapx,
          mapy: dayList[i][1][j].mapy,
          tel: dayList[i][1][j].tel,
          title: dayList[i][1][j].title,
          zipcode: dayList[i][1][j].zipcode,
        };
      }
    }
    const travelPlanner = {
      email: "",
      title: el,
      plan: JSON.stringify(newArr),
      type: 0,
      date: `${moment(dateList[0]).format("YYYY-MM-DD")}~${moment(dateList[dateList.length - 1]).format("YYYY-MM-DD")}`,
    };
    postPlanData(travelPlanner);
  };

  return (
    <>
      {!isUpdate && <CreatePlanCalendar open={isModalOpen} setOpen={setIsModalOpen} setDateList={setDateList} />}
      <Styles.ModalCustom isOpen={autoPlanOpen} onRequestClose={() => setAutoPlanOpen(false)} style={{ overlay: { zIndex: "4", backgroundColor: "rgba(20, 20, 30, 0.5)" } }} ariaHideApp={false}>
        <Styles.ModalTitle>✨ 어디로 여행 가시나요?</Styles.ModalTitle>
        <Styles.AutoPlanDesc>목적지만 입력하면 근처 관광지·맛집으로 {dateList?.length ?? 0}일 일정을 자동으로 채워드려요.</Styles.AutoPlanDesc>
        <Styles.TravelInputBox>
          <Styles.TravelInput
            placeholder="예: 부산, 강릉, 전주한옥마을"
            value={autoPlanKeyword}
            onChange={(e) => setAutoPlanKeyword(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && runAutoPlan()}
          />
          <Styles.TravelInputBtn onClick={runAutoPlan}>{autoPlanLoading ? "생성중..." : "생성"}</Styles.TravelInputBtn>
        </Styles.TravelInputBox>
        <Styles.BtnBox>
          <Styles.Btn onClick={() => setAutoPlanOpen(false)}>닫기</Styles.Btn>
        </Styles.BtnBox>
      </Styles.ModalCustom>
      <Styles.ModalCustom
        isOpen={planNameOpen}
        onRequestClose={() => setPlanNameOpen(false)}
        style={{ overlay: { zIndex: "4", backgroundColor: "rgba(20, 20, 30, 0.5)" } }}
        ariaHideApp={false}>
        <Styles.ModalTitle>플랜명을 입력해주세요</Styles.ModalTitle>
        <Styles.ModalInput
          autoFocus
          placeholder="예: 부산 여행"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && confirmPlanName()}
        />
        <Styles.BtnBox>
          <Styles.Btn onClick={() => setPlanNameOpen(false)}>취소</Styles.Btn>
          <Styles.Btn primary onClick={confirmPlanName}>확인</Styles.Btn>
        </Styles.BtnBox>
      </Styles.ModalCustom>
      {isModalOpen ? null : (
        <Styles.Wrapper>
          <Styles.PlanApplyBtn onClick={checkTitle}>적용하기</Styles.PlanApplyBtn>
          <Styles.OpenBtn
            open={controlOpen}
            left
            onClick={() => {
              setControlOpen(!controlOpen);
            }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ transform: controlOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Styles.OpenBtn>
          <Styles.ControlBox open={controlOpen}>
            <Styles.ContentBox>
              <Styles.CloseBtn right onClick={onClose}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </Styles.CloseBtn>
              <Styles.DateBox>
                <Styles.TravelDate>{`${moment(dateList[0]).format("YYYY-MM-DD")} ~ ${moment(dateList[dateList.length - 1]).format(
                  "YYYY-MM-DD"
                )}`}</Styles.TravelDate>
                {!isUpdate && <Styles.TravelCalendar onClick={() => window.location.reload()} src="assets/calendar.png" />}
              </Styles.DateBox>
              {!isUpdate && (
                <Styles.AutoPlanBtn onClick={() => setAutoPlanOpen(true)}>✨ AI로 자동 채우기</Styles.AutoPlanBtn>
              )}
              {festivals.length > 0 && (
                <Styles.FestivalBox>
                  <Styles.FestivalTitle>🎉 여행 기간 중 이 지역 축제·행사</Styles.FestivalTitle>
                  <Styles.FestivalScroll>
                    {festivals.map((fes) => (
                      <Styles.FestivalCard
                        key={fes.contentid}
                        onClick={() => window.open(`${window.location.origin}${import.meta.env.BASE_URL}information?id=${fes.contentid}`)}>
                        <Styles.FestivalImg src={fes.firstimage ? fes.firstimage : fes.firstimage2 ? fes.firstimage2 : "assets/logo.png"} />
                        <Styles.FestivalName>{fes.title}</Styles.FestivalName>
                        <Styles.FestivalDate>
                          {fes.eventstartdate?.slice(4, 6)}.{fes.eventstartdate?.slice(6, 8)} ~ {fes.eventenddate?.slice(4, 6)}.{fes.eventenddate?.slice(6, 8)}
                        </Styles.FestivalDate>
                      </Styles.FestivalCard>
                    ))}
                  </Styles.FestivalScroll>
                </Styles.FestivalBox>
              )}
              {dateList.map((el, idx) => {
                return (
                  <div key={idx}>
                    <Styles.ListItemBox key={idx}>
                      <Styles.DayTitleRow>
                        <Styles.DayTitle>DAY {idx + 1}</Styles.DayTitle>
                        {dayWeather[idx]?.code !== undefined && (
                          <Styles.DayWeather>
                            {weatherIcon(dayWeather[idx].code)} {dayWeather[idx].region ? `${dayWeather[idx].region} ` : ""}
                            {dayWeather[idx].tmin}° / {dayWeather[idx].tmax}°
                          </Styles.DayWeather>
                        )}
                        {dayWeather[idx]?.pm25 !== undefined && (
                          <Styles.DayWeather>
                            {pm25Grade(dayWeather[idx].pm25).icon} 미세먼지 {pm25Grade(dayWeather[idx].pm25).label}
                          </Styles.DayWeather>
                        )}
                        {(() => {
                          const demand = dayWeather[idx]?.demand;
                          const tier = getHeatTier(demand?.visitor);
                          if (!tier) return null;
                          const dateLabel = demand.date ? `${demand.date.slice(0, 4)}-${demand.date.slice(4, 6)}-${demand.date.slice(6, 8)}` : "";
                          return (
                            <Styles.HeatBadgeWrap>
                              <Styles.DayWeather>
                                {tier.icon} {tier.label}
                              </Styles.DayWeather>
                              <Styles.HeatTooltip>
                                {dateLabel} 기준
                                <br />
                                현지인 {demand.local?.toLocaleString() ?? "-"}명 · 외지인 {demand.visitor.toLocaleString()}명
                              </Styles.HeatTooltip>
                            </Styles.HeatBadgeWrap>
                          );
                        })()}
                      </Styles.DayTitleRow>
                      {update === idx + 1
                        ? dayList[idx][1].map((e, id) => {
                            return (
                              <div key={id}>
                                <Styles.DayItem>
                                  <Styles.DayItemImg
                                    src={e.firstimage ? e.firstimage : e.firstimage2 ? e.firstimage2 : "assets/logo.png"}
                                    onClick={() => window.open(`${window.location.origin}${import.meta.env.BASE_URL}information?id=${e.contentid}`)}
                                  />
                                  <Styles.DayItemTextBox notcolumn={true}>
                                    <Styles.DayItemTextBox>
                                      <Styles.DayItemTitle onClick={() => window.open(`${window.location.origin}${import.meta.env.BASE_URL}information?id=${e.contentid}`)}>
                                        {e.title}
                                      </Styles.DayItemTitle>
                                      <Styles.LocationImg open={dayMarkerOpen[id]} value={[e.mapy, e.mapx, 0]} onClick={(e) => moveMapLocation(e, id)} />
                                    </Styles.DayItemTextBox>
                                    <Styles.DayItemSubTextBox>
                                      <Styles.DayItemText>{e.addr1.split(" ")[0] + e.addr1.split(" ")[1]}</Styles.DayItemText>
                                      <Styles.ItemBtn remove onClick={() => removeTour(id, update)}>
                                        삭제
                                      </Styles.ItemBtn>
                                    </Styles.DayItemSubTextBox>
                                  </Styles.DayItemTextBox>
                                </Styles.DayItem>
                                {routeLegs[id] && (
                                  <Styles.RouteInfo>
                                    🚗 {(routeLegs[id].distance / 1000).toFixed(1)}km · 약 {Math.round(routeLegs[id].duration / 60)}분
                                  </Styles.RouteInfo>
                                )}
                              </div>
                            );
                          })
                        : ""}
                      <Styles.PlanAddBtnBox>
                        <Styles.PlanAddBtn
                          updated={update === idx + 1 ? (dayList[idx][1].length !== 0 ? false : true) : false}
                          onClick={() => onUpdate(idx + 1)}>
                          {update === idx + 1 ? (dayList[idx][1].length === 0 ? "취소" : "완료") : "일정 수정"}
                        </Styles.PlanAddBtn>
                      </Styles.PlanAddBtnBox>
                    </Styles.ListItemBox>
                  </div>
                );
              })}
            </Styles.ContentBox>
          </Styles.ControlBox>
          <Styles.Map>
            <Map lon={coordinate.lon} lat={coordinate.lat} path={routePath} markers={dayRouteMarkers} />
          </Styles.Map>
          <Styles.TravelBox open={travelOpen}>
            <Styles.ContentBox>
              <Styles.TravelInputBox>
                <Styles.TravelInput ref={travelInputRef} placeholder="검색할 여행지를 입력해주세요." onBlur={(e) => handleBlur(e)} onKeyUp={handleOnKeyPress} />
                <Styles.TravelInputBtn onClick={onSubmit}>검색</Styles.TravelInputBtn>
              </Styles.TravelInputBox>
              <Styles.CategoryTabBox>
                {categoryTabs.map((tab) => (
                  <Styles.CategoryTab
                    key={tab.id}
                    active={contentType === tab.id}
                    onClick={() => {
                      setContentType(tab.id);
                      const keyword = travelInputRef.current?.value ?? "";
                      if (keyword) {
                        searchTours(keyword, tab.id);
                      } else {
                        setSearchKeyword("");
                        tourData(tab.id);
                      }
                    }}>
                    {tab.label}
                  </Styles.CategoryTab>
                ))}
              </Styles.CategoryTabBox>
              <Styles.ListBox>
                <Styles.ListTitleBox>
                  <Styles.ListTitle>전체 여행지</Styles.ListTitle>
                  <Styles.ListFilter onClick={() => setFilterOpen(!filterOpen)}>필터</Styles.ListFilter>
                </Styles.ListTitleBox>
                {filterOpen && (
                  <>
                    <Styles.FilterBox>
                      {catOptions.map((cat) => (
                        <Styles.FilterItemBox key={cat.id} onClick={() => toggleCat(cat.id)}>
                          <Styles.FilterCheckBox type="checkbox" checked={selectedCats.includes(cat.id)} onChange={() => toggleCat(cat.id)} />
                          <Styles.FilterItemText>{cat.label}</Styles.FilterItemText>
                        </Styles.FilterItemBox>
                      ))}
                    </Styles.FilterBox>
                    <Styles.FilterBtnBox>
                      <Styles.FilterBtn onClick={() => setSelectedCats([])}>초기화</Styles.FilterBtn>
                      <Styles.FilterBtn onClick={() => setFilterOpen(false)}>닫기</Styles.FilterBtn>
                    </Styles.FilterBtnBox>
                  </>
                )}
                <Styles.ScrollBox>
                  {!rendering2 ? (
                    <Spinner text="여행지를 불러오는 중입니다..." padding="40px 0" size="28px" />
                  ) : visibleTours.length === 0 ? (
                    <Styles.DayItem>
                      <Styles.DayItemTitle>
                        {selectedCats.length > 0 ? "선택한 카테고리에 해당하는 결과가 없습니다." : `"${decodeURIComponent(searchKeyword)}" 에 대한 검색결과가 없습니다.`}
                      </Styles.DayItemTitle>
                    </Styles.DayItem>
                  ) : (
                    visibleTours
                      .filter((e, index) => {
                        if (index >= (page1 - 1) * itemsCount && index < page1 * itemsCount) return e;
                      })
                      .map((tour, id) => {
                        const heatTier = getHeatTier(visitorCountOf(tour));
                        return (
                          <div key={id}>
                            <Styles.DayItem>
                              <Styles.DayItemImg
                                src={tour.firstimage ? tour.firstimage : tour.firstimage2 ? tour.firstimage2 : "assets/logo.png"}
                                onClick={() => window.open(`${window.location.origin}${import.meta.env.BASE_URL}information?id=${tour.contentid}`)}
                              />
                              <Styles.DayItemTextBox notcolumn={true}>
                                <Styles.DayItemTextBox>
                                  <Styles.DayItemTitle onClick={() => window.open(`${window.location.origin}${import.meta.env.BASE_URL}information?id=${tour.contentid}`)}>
                                    {heatTier && <Styles.DayWeather>{heatTier.icon} {heatTier.label}</Styles.DayWeather>}
                                    {tour.title}
                                  </Styles.DayItemTitle>
                                  <Styles.LocationImg open={searchMarkerOpen[id]} value={[tour.mapy, tour.mapx, 1]} onClick={(e) => moveMapLocation(e, id)} />
                                </Styles.DayItemTextBox>
                                <Styles.ItemBox>
                                  <Styles.DayItemText>{tour.addr1}</Styles.DayItemText>
                                  <Styles.ItemBtn onClick={() => addTour(tour, update)}>추가하기</Styles.ItemBtn>
                                </Styles.ItemBox>
                              </Styles.DayItemTextBox>
                            </Styles.DayItem>
                          </div>
                        );
                      })
                  )}
                </Styles.ScrollBox>
                {tours === "" ? "" : <Paging page={page1} count={visibleTours.length} setPage={setPage1} itemsCount={itemsCount} />}
              </Styles.ListBox>
              {nearbyAnchor && (
                <Styles.ListBox>
                  <Styles.ListTitleBox>
                    <Styles.ListTitle>{nearbyAnchor.title} 근처 가볼만한 곳</Styles.ListTitle>
                  </Styles.ListTitleBox>
                  <Styles.ScrollBox>
                    {nearbyLoading ? (
                      <Spinner text="근처 장소를 찾는 중입니다..." padding="40px 0" size="28px" />
                    ) : nearbyPlaces.length === 0 ? (
                      <Styles.DayItem>
                        <Styles.DayItemTitle>근처에 추천할 만한 곳이 없습니다.</Styles.DayItemTitle>
                      </Styles.DayItem>
                    ) : (
                      nearbyPlaces
                        .filter((_, idx) => idx >= (nearbyPage - 1) * nearbyItemsCount && idx < nearbyPage * nearbyItemsCount)
                        .map((place, idx) => {
                          return (
                            <div key={idx}>
                              <Styles.DayItem>
                                <Styles.DayItemImg
                                  src={place.firstimage ? place.firstimage : place.firstimage2 ? place.firstimage2 : "assets/logo.png"}
                                  onClick={() => window.open(`${window.location.origin}${import.meta.env.BASE_URL}information?id=${place.contentid}`)}
                                />
                                <Styles.DayItemTextBox notcolumn={true}>
                                  <Styles.DayItemTextBox>
                                    <Styles.DayItemTitle onClick={() => window.open(`${window.location.origin}${import.meta.env.BASE_URL}information?id=${place.contentid}`)}>
                                      {place.title}
                                    </Styles.DayItemTitle>
                                  </Styles.DayItemTextBox>
                                  <Styles.ItemBox>
                                    <Styles.DayItemText>{place.addr1}</Styles.DayItemText>
                                    <Styles.ItemBtn onClick={() => addTour(place, update)}>추가하기</Styles.ItemBtn>
                                  </Styles.ItemBox>
                                </Styles.DayItemTextBox>
                              </Styles.DayItem>
                            </div>
                          );
                        })
                    )}
                  </Styles.ScrollBox>
                  {nearbyPlaces.length === 0 ? null : (
                    <Paging page={nearbyPage} count={nearbyPlaces.length} setPage={setNearbyPage} itemsCount={nearbyItemsCount} />
                  )}
                </Styles.ListBox>
              )}
              <Styles.ListBox>
                <Styles.ListTitleBox>
                  <Styles.ListTitle>찜한 여행지</Styles.ListTitle>
                </Styles.ListTitleBox>
                <Styles.ScrollBox>
                  {!rendering ? (
                    <Spinner text="찜한 여행지를 불러오는 중입니다..." padding="40px 0" size="28px" />
                  ) : cart.length === 0 ? (
                    <Styles.DayItem>
                      <Styles.DayItemTitle>찜한 목록이 없습니다.</Styles.DayItemTitle>
                    </Styles.DayItem>
                  ) : (
                    cart
                      .filter((e, index) => {
                        if (index >= (page2 - 1) * itemsCount2 && index < page2 * itemsCount2) return e;
                      })
                      .map((el, idx) => {
                        return (
                          <div key={idx}>
                            <Styles.DayItem>
                              <Styles.DayItemImg
                                src={el.firstimage ? el.firstimage : el.firstimage2 ? el.firstimage2 : "assets/logo.png"}
                                onClick={() => window.open(`${window.location.origin}${import.meta.env.BASE_URL}information?id=${el.contentid}`)}
                              />
                              <Styles.DayItemTextBox notcolumn={true}>
                                <Styles.DayItemTextBox>
                                  <Styles.DayItemTitle onClick={() => window.open(`${window.location.origin}${import.meta.env.BASE_URL}information?id=${el.contentid}`)}>
                                    {el.title}
                                  </Styles.DayItemTitle>
                                  <Styles.LocationImg open={dibsMarkerOpen[idx]} value={[el.mapy, el.mapx, 2]} onClick={(e) => moveMapLocation(e, idx)} />
                                </Styles.DayItemTextBox>
                                <Styles.ItemBox>
                                  <Styles.DayItemText>{el.addr1}</Styles.DayItemText>
                                  <Styles.ItemBtn onClick={() => addTour(el, update)}>추가하기</Styles.ItemBtn>
                                  <Styles.ItemBtn remove onClick={() => deleteDibs(el)}>
                                    찜 삭제
                                  </Styles.ItemBtn>
                                </Styles.ItemBox>
                              </Styles.DayItemTextBox>
                            </Styles.DayItem>
                          </div>
                        );
                      })
                  )}
                </Styles.ScrollBox>
                {cart.length === 0 ? null : <Paging page={page2} count={totalItemsCount2} setPage={setPage2} itemsCount={itemsCount2} />}
              </Styles.ListBox>
            </Styles.ContentBox>
          </Styles.TravelBox>
        </Styles.Wrapper>
      )}
    </>
  );
};

export default CreatePlanPage;
