import React, { useEffect, useState, useRef } from "react";
import * as Styles from "./style";
import { useNavigate } from "react-router-dom";
import { MarginTopWrapper } from "../../Common/style";
import { getAddressData } from "../../Data";
import axios from "axios";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import Spinner from "../../Common/Spinner";
import { useLikes } from "../../hooks/useLikes";

const MainPage = () => {
  const navigate = useNavigate();
  const [addressData, setAddressData] = useState(null);
  const [filterAddressData, setFilterAddressData] = useState([]);
  const searchInput = useRef("");
  const [searchKeyword, setSearchKeyword] = useState();
  const [searcWord, setSearchWord] = useState();
  const [content, setContent] = useState([]);
  const { isLiked, toggleLike, reloadLikes } = useLikes("P");
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    reload();
  }, []);

  const reload = async () => {
    // getUserPlan/reloadLikes는 비동기라 기다리지 않고 setIsLoding(true)를
    // 바로 호출하면 실제로는 데이터가 오기 전에 로딩이 끝난 것처럼 보인다.
    // 실패하더라도 finally에서 로딩을 꺼줘야 스피너가 영원히 돌지 않는다.
    setIsLoding(false);
    try {
      await Promise.all([getUserPlan(), reloadLikes()]);
    } finally {
      setIsLoding(true);
    }
  };
  const getUserPlan = async () => {
    // DB에 있는 플랜데이터
    const data = await axios.get("/getPlan");
    if (data) {
      setContent(data.data.data.sort((a, b) => b.likeCount - a.likeCount).slice(0, data.data.data.length < 5 ? data.data.data.length : 5));
    } else {
      getUserPlan();
    }
  };
  const goCreatePlanPage = () => {
    toast.info("로그인 후 이용해 주세요.");
    navigate("/login");
  };
  const moveSharedPlan = () => {
    navigate("/shared");
  };

  const NextArrow = (props) => {
    const { className, onClick } = props;
    return <Styles.SliderArrow src="assets/arrow.png" className={className} onClick={onClick} />;
  };

  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return <Styles.SliderArrow src="assets/arrow.png" className={className} onClick={onClick} prev />;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const onPreview = async (e) => {
    setSearchWord(e.target.value);
    if (addressData === null) {
      const data = await getAddressData();
      setAddressData(data);
      return;
    }

    const filterData = addressData.filter((el) => el.name.replace(/(\s*)/g, "").includes(e.target.value.replace(/(\s*)/g, "")));
    setFilterAddressData(filterData);
    setSearchKeyword(e.target.value);
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      if(e.target.value){
        navigate(`/travel?search=${e.target.value}`);  
      }else{
        navigate(`/travel`);
      }
    }
  };

  const onSubmit = (e) => {
    if(e === undefined){ // 돋보기 버튼을 눌렀을때
      navigate(`/travel?search=${searcWord !== undefined ? searcWord : ""}`);
    }else{
      navigate(`/travel?search=${e}`);
    }
  };

  const addLikes = (id) => {
    toggleLike(id, () => reload());
  };

  const infoMove = (e) => {
    navigate(`/calendar?id=${e.id}`);
  };

  return (
    <>
      <Styles.Wrapper>
        <Styles.Video controls={false} muted autoPlay loop>
          <source src="assets/video.mp4" type="video/mp4" />
        </Styles.Video>
        <Styles.VideoOverlay />
        <Styles.ContentBox>
          <Styles.Eyebrow>
            <SparkleIcon /> 데이터 기반 스마트 여행 플래너
          </Styles.Eyebrow>
          <Styles.Title>TRAVEL PLANNER</Styles.Title>
          <Styles.Subtitle>지역 하나만 검색하면, 날씨·동선·주변 추천까지 한 번에 계획해드려요.</Styles.Subtitle>
          <Styles.InputBox>
            <Styles.Input placeholder="예: 서울특별시 성동구" onChange={(e) => onPreview(e)} ref={searchInput} onKeyUp={handleOnKeyPress} />
            <Styles.Btn
              onClick={() => {
                onSubmit();
              }}>
              <SearchIcon />
            </Styles.Btn>
            <Styles.InputPreView display={searchInput.current.value && filterAddressData.length > 0 ? "true" : undefined}>
              {searchInput.current.value &&
                filterAddressData.map((el, idx) => {
                  return (
                    <Styles.InputPreItem
                      onClick={() => {
                        onSubmit(el.name);
                      }}
                      key={idx}>
                      {el.name}
                    </Styles.InputPreItem>
                  );
                })}
            </Styles.InputPreView>
          </Styles.InputBox>
          <Styles.ChipRow>
            <Styles.Chip>☀️ Day별 날씨 안내</Styles.Chip>
            <Styles.Chip>📍 주변 추천</Styles.Chip>
            <Styles.Chip>🚗 동선 자동 계산</Styles.Chip>
          </Styles.ChipRow>
        </Styles.ContentBox>
      </Styles.Wrapper>
      <MarginTopWrapper>
        <Styles.Section>
          <Styles.SectionHead>
            <Styles.SectionEyebrow>WHY TRAVEL PLANNER</Styles.SectionEyebrow>
            <Styles.SectionTitle>여행 계획을 더 똑똑하게</Styles.SectionTitle>
            <Styles.SectionSubtitle>흩어진 여행 정보를 모으고, 반복 작업은 자동으로 처리해드려요.</Styles.SectionSubtitle>
          </Styles.SectionHead>
          <Styles.FeatureGrid>
            <Styles.FeatureCard>
              <Styles.FeatureIconWrap>
                <MapIcon />
              </Styles.FeatureIconWrap>
              <Styles.FeatureTitle>전국 관광지 데이터</Styles.FeatureTitle>
              <Styles.FeatureText>관광지·맛집·숙박 정보를 카테고리와 키워드로 빠르게 검색하고 비교할 수 있어요.</Styles.FeatureText>
            </Styles.FeatureCard>
            <Styles.FeatureCard>
              <Styles.FeatureIconWrap>
                <HeartIcon />
              </Styles.FeatureIconWrap>
              <Styles.FeatureTitle>찜하고 비교하기</Styles.FeatureTitle>
              <Styles.FeatureText>마음에 드는 장소를 찜해두고 나만의 후보 리스트를 만들어 비교해보세요.</Styles.FeatureText>
            </Styles.FeatureCard>
            <Styles.FeatureCard>
              <Styles.FeatureIconWrap>
                <RouteIcon />
              </Styles.FeatureIconWrap>
              <Styles.FeatureTitle>일정 자동 계산</Styles.FeatureTitle>
              <Styles.FeatureText>Day별 날씨 예보, 장소 간 이동 거리·시간, 주변 추천까지 자동으로 계산해드려요.</Styles.FeatureText>
            </Styles.FeatureCard>
          </Styles.FeatureGrid>
        </Styles.Section>

        <Styles.Section>
          <Styles.CTAPanel>
            <Styles.CTATitle>지금 바로 여행 계획을 세워보세요</Styles.CTATitle>
            <Styles.CTAText>원하는 여행지를 찾아보고, 몇 번의 클릭만으로 일정을 완성할 수 있어요.</Styles.CTAText>
            {!sessionStorage.getItem("access_token") ? (
              <Styles.BottomContentBtn onClick={goCreatePlanPage}>플랜 작성하기</Styles.BottomContentBtn>
            ) : (
              <Styles.BottomContentBtn
                onClick={() => {
                  navigate("/CreatePlanPage");
                }}>
                플랜 작성하기
              </Styles.BottomContentBtn>
            )}
          </Styles.CTAPanel>
        </Styles.Section>

        <Styles.Section>
          <Styles.CarouselBox>
            <Styles.CarouselTitle>인기플랜</Styles.CarouselTitle>
            <Styles.CarouselSubtitle>다른 여행자들이 만든 인기 플랜을 둘러보세요.</Styles.CarouselSubtitle>
            {!isLoding ? (
              <Spinner text="플랜을 불러오는 중입니다..." padding="40px 0" />
            ) : (
              content.length < 3 && "현재 플랜이 3개 이상이 되지 않습니다."
            )}
            <Styles.SliderCustom {...settings}>
              {content.length < 3
                ? null
                : content.map((el, idx) => {
                    return (
                      <Styles.SliderBox key={idx}>
                        <Styles.SliderImg
                          src={
                            JSON.parse(el.plan)[0].list[0].firstimage
                              ? JSON.parse(el.plan)[0].list[0].firstimage
                              : JSON.parse(el.plan)[0].list[0].firstimage2
                              ? JSON.parse(el.plan)[0].list[0].firstimage2
                              : "assets/logo.png"
                          }
                          onClick={() => infoMove(el)}
                        />
                        <Styles.SliderInfo>
                          <Styles.SliderInfoText onClick={() => infoMove(el)}>{el.title}</Styles.SliderInfoText>
                          <Styles.SliderInfoText>{el.date}</Styles.SliderInfoText>
                          <Styles.SliderInfoBottomBox>
                            <Styles.SliderInfoBox>
                              {isLiked(el.id) ? (
                                <HeartFilled style={{ color: "red", fontSize: "30px" }} onClick={() => addLikes(el.id)} />
                              ) : (
                                <HeartOutlined style={{ fontSize: "30px" }} onClick={() => addLikes(el.id)} />
                              )}
                              <Styles.SliderInfoText>{el.likeCount}</Styles.SliderInfoText>
                            </Styles.SliderInfoBox>
                            <Styles.SliderInfoText>{el.email.name}</Styles.SliderInfoText>
                          </Styles.SliderInfoBottomBox>
                        </Styles.SliderInfo>
                      </Styles.SliderBox>
                    );
                  })}
            </Styles.SliderCustom>
            <Styles.PrimaryButton onClick={moveSharedPlan}>플랜 모두 보기</Styles.PrimaryButton>
          </Styles.CarouselBox>
        </Styles.Section>
      </MarginTopWrapper>
    </>
  );
};

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l1.8 5.6L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.4L12 2zM19 14l.9 2.7L22.5 17l-2.6.9L19 20.5l-.9-2.6L15.5 17l2.6-.3L19 14z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2.2" />
    <path d="M21 21l-4.3-4.3" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const MapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 21s-7-6.1-7-11.5A7 7 0 0119 9.5C19 14.9 12 21 12 21z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M12 20.5s-7.6-4.6-10-9.3C.4 8 2 4.5 5.6 4c2.2-.3 4.1.9 6.4 2.9C14.3 4.9 16.2 3.7 18.4 4c3.6.5 5.2 4 3.6 7.2-2.4 4.7-10 9.3-10 9.3z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const RouteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="5" cy="6" r="2.2" stroke="currentColor" strokeWidth="2" />
    <circle cx="19" cy="18" r="2.2" stroke="currentColor" strokeWidth="2" />
    <path d="M6.8 7.6C9 10 8 13 11 14.5s6 .5 6.6 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 3.6" />
  </svg>
);

export default MainPage;
