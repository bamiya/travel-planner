# 🧭 Travel Planner

여행지를 검색하고, 찜하고, Day별 일정을 짜고, 완성한 플랜을 다른 사람들과 공유하는 여행 플래너 웹 서비스입니다.
공공데이터(TourAPI)와 여러 무료 API를 엮어서 "검색 → 계획 → 공유"까지 한 곳에서 끝낼 수 있도록 만들었습니다.

## ✨ 주요 기능

### 여행지 탐색
- 관광지 · 음식점 · 숙박 카테고리별 검색 및 키워드 검색 (TourAPI 연동)
- 자연 / 인문 / 레포츠 / 쇼핑 / 음식 등 세부 카테고리 필터
- 찜하기 · 좋아요

### 여행지 상세
- 여러 장의 사진 갤러리
- 네이버 지도로 위치 확인
- 반경 내 **주변 추천 장소** (맛집 · 명소 자동 추천)
- **반려동물 동반 가능 여부** 표시
- 방문자 댓글(톡톡)

### 플랜 생성
- 캘린더에서 날짜를 고르면 Day별 일정표가 자동으로 생성
- 하루 일정에 넣은 장소들 사이의 **이동 거리 · 소요 시간 자동 계산**
- Day별 **날씨 예보**와 **미세먼지 정보**를 한눈에 확인
- 여행 기간 · 방문 지역에 맞는 **축제 · 행사 추천**
- 완성한 플랜을 다른 사용자에게 공유하고, 좋아요를 받을 수 있음

### 계정
- 이메일 회원가입 · 로그인 / 카카오 소셜 로그인
- 이메일 인증코드 기반 비밀번호 찾기 · 변경

## 🛠 기술 스택

**Frontend** — React 18 · Vite · styled-components · React Router

**연동 API**
| API | 용도 | 비고 |
|---|---|---|
| [TourAPI 2.0](https://api.visitkorea.or.kr) | 관광지 · 사진 · 축제 · 반려동반 정보 | 한국관광공사, 공공데이터포털 키 필요 |
| [Naver Maps](https://www.ncloud.com/product/applicationService/maps) | 지도 · 마커 | Naver Cloud Platform 키 필요 |
| [Open-Meteo](https://open-meteo.com) | 날씨 예보 · 대기질 | 무료, 키 불필요 |
| [OSRM](https://project-osrm.org) | 이동 거리 · 소요 시간 계산 | 무료, 키 불필요 |

**관련 저장소**
- [travel-planner-backend](https://github.com/bamiya/travel-planner-backend) — Spring Boot 기반 API 서버 (회원 · 플랜 · 댓글 · 좋아요)
- [travelplannervideoserver](https://github.com/bamiya/travelplannervideoserver) — Express 기반 비디오 스트리밍 서버

## 🚀 시작하기

```bash
npm install
```

프로젝트 루트에 `.env` 파일을 만들고 아래 값을 채워주세요.

```env
VITE_TOUR_API_KEY=발급받은_TourAPI_서비스키
VITE_APP_NAVER_MAP_CLIENT_ID=발급받은_네이버지도_Client_ID
```

```bash
npm start      # 개발 서버 실행 (Vite)
npm run build  # 프로덕션 빌드
```

백엔드(`travel-planner-backend`)가 `http://localhost:8080`에서 함께 실행되고 있어야 회원 · 플랜 · 댓글 관련 기능이 정상 동작합니다.
