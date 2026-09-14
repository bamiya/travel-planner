import moment from "moment/moment";
import "react-calendar/dist/Calendar.css";
import React, { useState, useEffect, useRef } from "react";
import * as Styles from "./style";
import Map from "../../Components/kakaoMap";
import Paging from "../../Components/paging";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../Common/Spinner";

const CreatePlanCalendar = ({ open, setOpen, setDateList }) => {
  // 팝업
  const [value, onChange] = useState(new Date());

  // 이전 버튼을 눌렀을 때
  const onBack = () => {
    window.history.back();
  };

  const getApply = () => {
    // 클릭을 안했을때 (당일로 여행을 가서 바로 적용을 눌렀을때)
    if (!Array.isArray(value)) {
      setDateList([value]);
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
      <Styles.CalendarCustom onChange={onChange} value={value} selectRange />
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

  const [isModelOpen, setIsModelOpen] = useState(true); //날짜 모달
  const [dateList, setDateList] = useState();

  //박스를 움직이게 하는 state
  const [controlOpen, setControlOpen] = useState(false); // Control
  const [travelOpen, settravelOpen] = useState(false); // Travel

  const [update, setUpdate] = useState(null);

  // 추천 여행지 페이지네이션
  const [page1, setPage1] = useState(1);
  const [itemsCount] = useState(6);
  const [totalItemsCount1, setStotalItemCount1] = useState(50); 

  // 찜한 여행지 페이지네이션
  const [page2, setPage2] = useState(1);
  const [itemsCount2] = useState(6);
  const [totalItemsCount2, setStotalItemCount2] = useState(50); 

  // 페이지 이동 시 마커 삭제
  const pagingHook = useRef(false);

  // 마커 클릭 시 지도
  const [coordinate, setCoordinate] = useState([]); // 좌표
  const [tourMakerSelect0, setTourMakerSelect0] = useState(); // 추가한 관광지 지도 마커
  const [tourMakerSelect1, setTourMakerSelect1] = useState(); // 전체 관광지 지도 마커
  const [tourMakerSelect2, setTourMakerSelect2] = useState(); // 찜하기 관광지 지도 마커

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
  const [cart, setCart] = useState([]); // 찜
  const [tourSelect, setTourSelect] = useState([]); // 필요없는데 필요함..? 렌더링안됨
  const [dayList, setDayList] = useState(); // 총 일정목록

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
      setIsModelOpen(false);
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

  useEffect(() => {
    // 찜 목록 불러오는 event
    if (sessionStorage.getItem("dibs")) {
      const dibs = sessionStorage.getItem("dibs").split(" ");
      dibs.pop(); // 쓰레기 값 제거
      tourData2(dibs).then((value) => setCart(value));
    } else {
      setRendering(true);
    }
  }, []);

  useEffect(() => {
    if (dateList !== undefined) {
      let arr = [];
      for (let i = 0; i < dateList.length; i++) {
        arr[i] = [i + 1, []];
      }
      setDayList(arr);
    }
  }, [dateList]);

  // 하루 일정에 추가한 장소 사이의 이동거리/시간 안내 (OSRM 무료 라우팅 API)
  const [routeLegs, setRouteLegs] = useState([]);
  useEffect(() => {
    const getRouteLegs = async () => {
      if (!update || !dayList || !dayList[update - 1]) {
        setRouteLegs([]);
        return;
      }
      const stops = dayList[update - 1][1];
      if (stops.length < 2) {
        setRouteLegs([]);
        return;
      }
      try {
        const coords = stops.map((s) => `${s.mapx},${s.mapy}`).join(";");
        const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${coords}?overview=false`);
        const json = await response.json();
        setRouteLegs(json.routes?.[0]?.legs ?? []);
      } catch (e) {
        // 무료 공개 데모 서버라 실패해도 조용히 무시하고 안내를 숨긴다.
        setRouteLegs([]);
      }
    };
    getRouteLegs();
  }, [dayList, update]);

  useEffect(() => {
    if (pagingHook.current) {
      setTourMakerSelect1(Array(totalItemsCount1).fill(false));
    } else {
      pagingHook.current = true;
    }
  }, [page1]);

  useEffect(() => {
    if (pagingHook.current) {
      setTourMakerSelect2(Array(totalItemsCount2).fill(false));
    } else {
      pagingHook.current = true;
    }
  }, [page2]);

  useEffect(() => {
    if (pagingHook.current) {
      setTourMakerSelect1(Array(totalItemsCount1).fill(false));
      setTourMakerSelect2(Array(totalItemsCount2).fill(false));
    } else {
      pagingHook.current = true;
    }
  }, [page2]);

  useEffect(() => {

  }, [page1, itemsCount]);

  useEffect(() => {

  }, [page2, itemsCount2]);

  useEffect(() => {
    if (dayList && location.state) {
      onUpdateSetDate();
    }
  }, [dayList]);

  const onUpdateSetDate = () => {
    const plans = JSON.parse(location.state.updateData.plan);
    for (let i = 0; i < plans.length; i++) {
      for (let j = 0; j < plans[i].list.length; j++) {
        addTour(plans[i].list[j], plans[i].day);
      }
    }
  };

  const postPlanData = async (el) => {
    // 플랜
    try {
      if (isUpdate) {
        await axios.put("http://localhost:8080/updatePlan", { ...el, id: `${location.state.updateData.id}` });
      } else {
        await axios.post("http://localhost:8080/createPlan", el);
      }
      navigate("/");
    } catch (e) {
      toast.error(e.response.data.msg);
      navigate("/");
    }
  };

  const onUpdate = (idx) => {
    if (update == null) {
      setUpdate(idx);
      settravelOpen(true);
    } else if ((update !== null) & (update !== idx)) {
      toast.error("현재 수정하고 있는 DAY가 있습니다.");
    } else {
      setTourSelect([]);
      setUpdate(null);
      settravelOpen(false);
      setTourMakerSelect0(Array(dayList[idx - 1][1].length).fill(false)); // 취소 클릭 시 마커 초기화
    }
  };

  const onClose = () => {
    if (update !== null) {
      return toast.error("아직 작업중인 DAY가 있습니다.");
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
        const tourItems = json.response?.body?.items?.item ?? [];
        setStotalItemCount1(tourItems.length);
        setTours(tourItems);
        setTourStorage(tourItems);
        setPage1(1);
        setTourMakerSelect1(Array(tourItems.length).fill(false));
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
        const response = await fetch(
          `https://apis.data.go.kr/B551011/KorService2/detailCommon2?serviceKey=${process.env.VITE_TOUR_API_KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${idx[i]}`
        );
        const json = await response.json();
        const tourItems = (json.response?.body?.items?.item ?? [])[0];
        Arr[i] = tourItems;
        setStotalItemCount2(Arr.length);
        setPage2(1);
        setTourMakerSelect2(Array(Arr.length).fill(false));
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
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].contentid === el.contentid) {
        cart.splice(i, 1);
        setCart(cart);
        setTourSelect([...tourSelect]); // 렌더링 요청
        const dibs = sessionStorage.getItem("dibs");
        sessionStorage.setItem("dibs", dibs.replace(el.contentid + " ", ""));
        setStotalItemCount2(totalItemsCount2 - 1);
      }
    }
    if(!Math.ceil(cart.length / itemsCount2) - 1 === page2 || Math.ceil(cart.length / itemsCount2) - 1 === 0){
      setPage2(Math.ceil(cart.length / itemsCount2));
    }
  };

  const searchTours = async (keyword) => {
    // 키워드 검색 함수 (이름 기반 TourAPI 검색 사용, 없으면 전체 목록으로 복귀)
    if (!keyword) {
      setTours(tourStorage);
      setStotalItemCount1(tourStorage.length);
      setTourMakerSelect1(Array(tourStorage.length).fill(false));
      setPage1(1);
      return;
    }
    setRendering2(false);
    try {
      const response = await fetch(
        `https://apis.data.go.kr/B551011/KorService2/searchKeyword2?serviceKey=${process.env.VITE_TOUR_API_KEY}&numOfRows=100000&MobileOS=ETC&MobileApp=AppTest&_type=json&contentTypeId=${contentType}&keyword=${encodeURIComponent(keyword)}`
      );
      const json = await response.json();
      const tourItems = json.response?.body?.items?.item ?? []; // 검색 결과가 없으면 items가 빈 문자열로 온다
      setTours(tourItems);
      setStotalItemCount1(tourItems.length);
      setTourMakerSelect1(Array(tourItems.length).fill(false));
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
      const newArr = tourMakerSelect1.fill(false);
      newArr[id] = true;
      setTourMakerSelect1(Array(tourMakerSelect1.length).fill(false));
      setTourMakerSelect2(Array(tourMakerSelect1.length).fill(false));
      setTourMakerSelect0(newArr);
    } else if (num == 1) {
      const newArr = tourMakerSelect1.fill(false);
      newArr[id] = true;
      setTourMakerSelect0(Array(tourMakerSelect1.length).fill(false));
      setTourMakerSelect2(Array(tourMakerSelect1.length).fill(false));
      setTourMakerSelect1(newArr);
    } else {
      const newArr = tourMakerSelect2.fill(false);
      newArr[id] = true;
      setTourMakerSelect0(Array(tourMakerSelect2.length).fill(false));
      setTourMakerSelect1(Array(tourMakerSelect2.length).fill(false));
      setTourMakerSelect2(newArr);
    }
    setCoordinate(newCoor);
  };

  const addTour = (el, idx) => {
    // 관광지 추가 함수
    // dayList를 직접 mutate하고 같은 참조로 setDayList를 부르면 React가
    // 참조 비교로 변경을 감지 못해 이 값을 의존하는 effect(동선 계산 등)가
    // 다시 실행되지 않는다. 매번 새 배열을 만들어 넘겨야 한다.
    const newStops = [...dayList[idx - 1][1], el];
    const newDayList = dayList.map((day, i) => (i === idx - 1 ? [day[0], newStops] : day));
    setDayList(newDayList);
    setTourMakerSelect0(Array(newStops.length).fill(false));
    setTourSelect([...tourSelect, el]);
  };

  const removeTour = (idx, idx2) => {
    // 추가한 관광지 삭제 함수
    const newStops = dayList[idx2 - 1][1].filter((_, i) => i !== idx);
    const newDayList = dayList.map((day, i) => (i === idx2 - 1 ? [day[0], newStops] : day));
    setDayList(newDayList);
    setTourSelect([...tourSelect]);
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
      let planTitle = prompt("플랜명을 입력하세요", "");
      if (planTitle === null) {
        return;
      }
      if (planTitle.length === 0 || planTitle.length < 4 || planTitle.length > 15) {
        return toast.error("플랜명은 최소 4글자에서 최대 15글자 입니다.");
      } else {
        createPlan(planTitle);
      }
    }
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
      {!isUpdate && <CreatePlanCalendar open={isModelOpen} setOpen={setIsModelOpen} setDateList={setDateList} />}
      {isModelOpen ? null : (
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
              {dateList.map((el, idx) => {
                return (
                  <div key={idx}>
                    <Styles.ListItemBox key={idx}>
                      <Styles.DayTitle>DAY {idx + 1}</Styles.DayTitle>
                      {update === idx + 1
                        ? dayList[idx][1].map((e, id) => {
                            return (
                              <div key={id}>
                                <Styles.DayItem>
                                  <Styles.DayItemImg
                                    src={e.firstimage2 === "" ? "assets/logo.png" : e.firstimage2}
                                    onClick={() => window.open(`${window.location.origin}${import.meta.env.BASE_URL}information?id=${e.contentid}`)}
                                  />
                                  <Styles.DayItemTextBox notcolumn={true}>
                                    <Styles.DayItemTextBox>
                                      <Styles.DayItemTitle onClick={() => window.open(`${window.location.origin}${import.meta.env.BASE_URL}information?id=${e.contentid}`)}>
                                        {e.title}
                                      </Styles.DayItemTitle>
                                      <Styles.LocationImg open={tourMakerSelect0[id]} value={[e.mapy, e.mapx, 0]} onClick={(e) => moveMapLocation(e, id)} />
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
            <Map lon={coordinate.lon} lat={coordinate.lat} />
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
                      setSearchKeyword("");
                      tourData(tab.id);
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
                        return (
                          <div key={id}>
                            <Styles.DayItem>
                              <Styles.DayItemImg
                                src={tour.firstimage2 === "" ? "assets/logo.png" : tour.firstimage2}
                                onClick={() => window.open(`${window.location.origin}${import.meta.env.BASE_URL}information?id=${tour.contentid}`)}
                              />
                              <Styles.DayItemTextBox notcolumn={true}>
                                <Styles.DayItemTextBox>
                                  <Styles.DayItemTitle onClick={() => window.open(`${window.location.origin}${import.meta.env.BASE_URL}information?id=${tour.contentid}`)}>
                                    {tour.title}
                                  </Styles.DayItemTitle>
                                  <Styles.LocationImg open={tourMakerSelect1[id]} value={[tour.mapy, tour.mapx, 1]} onClick={(e) => moveMapLocation(e, id)} />
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
                                src={el.firstimage2 === "" ? "assets/logo.png" : el.firstimage2}
                                onClick={() => window.open(`${window.location.origin}${import.meta.env.BASE_URL}information?id=${el.contentid}`)}
                              />
                              <Styles.DayItemTextBox notcolumn={true}>
                                <Styles.DayItemTextBox>
                                  <Styles.DayItemTitle onClick={() => window.open(`${window.location.origin}${import.meta.env.BASE_URL}information?id=${el.contentid}`)}>
                                    {el.title}
                                  </Styles.DayItemTitle>
                                  <Styles.LocationImg open={tourMakerSelect2[idx]} value={[el.mapy, el.mapx, 2]} onClick={(e) => moveMapLocation(e, idx)} />
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
