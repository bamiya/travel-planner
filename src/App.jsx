import React, { useEffect, useState } from "react";
import Header from "./Components/header";
import Footer from "./Components/footer";
import MainPage from './Pages/mainPage';
import CalendarPage from "./Pages/calendarPage";
import InformationPage from './Pages/tourInfoPage';
import TravelPage from './Pages/travelPage';
import NotFoundPage from './Pages/notFoundPage';
import MyPage from "./Pages/myPage";
import SharedPlanPage from "./Pages/sharedPlanPage";
import EditMemberPage from"./Pages/editMemberPage";
import CreatePlanPage from "./Pages/createPlanPage";
import MyComments from "./Pages/myBarPage/myComment/index";
import MyPlan from "./Pages/myBarPage/myPlan";
import SharedPlan from "./Pages/myBarPage/sharedPlan/index";
import Like from "./Pages/myBarPage/like/index";
import LoginPage from "./Pages/loginPage";
import SignPage from "./Pages/signPage";
import FindPassPage from "./Pages/findPassPage";
import ChangePassPage from "./Pages/changePassPage";
import ScrollToTop from "./scrollToTop";
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { getAccessToken } from "./Data";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 모든 axios 호출이 "http://localhost:8080/xxx"를 매번 하드코딩하지 않고
// 상대경로("/xxx")만 쓰도록 기준 주소를 한 곳에서 관리한다.
axios.defaults.baseURL = "http://localhost:8080";

axios.interceptors.response.use(
  response => {
    // console.log("interceptors: ", response);
    return response;
  },
  async error => {
    // 네트워크 단절/타임아웃처럼 서버 응답 자체가 없는 실패는 error.response가 없다.
    // 가드 없이 .status를 읽으면 여기서 새 예외가 터지고, 그게 호출부의
    // catch(e) { ...e.response... }까지 그대로 전파되어 에러 토스트조차 안 뜨는
    // 완전히 조용한 실패로 이어진다.
    if(error.response?.status === 401){
      try{
        await getAccessToken();
        return await axios.request(error.config);
      }catch(e){
        // console.log(e);
      }
    }
    return Promise.reject(error);
});

axios.interceptors.request.use(
  config => {
      config.headers['Authorization'] = `Bearer ${sessionStorage.getItem('access_token')}`;
      return config;
    },
    error => {
        // console.log(error);
        return Promise.reject(error);
    }
);

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const App = () => {
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // 브라우저를 새로 열면 access_token(sessionStorage)은 사라지지만
    // refresh_token(localStorage)은 남아있다. 이 값으로 access_token을
    // 먼저 재발급받아둬야 로그인 상태가 유지된 채로 화면이 그려진다.
    const restoreSession = async () => {
      if (!sessionStorage.getItem("access_token") && localStorage.getItem("refresh_token")) {
        try {
          await getAccessToken();
        } catch (e) {
          localStorage.clear(); // 리프레쉬 토큰도 만료/무효 -> 로그아웃 상태로 정리
        }
      }
      setAuthChecked(true);
    };
    restoreSession();
  }, []);

  if (!authChecked) {
    return null;
  }

  return (
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <ToastContainer position="top-center" autoClose={2500} pauseOnHover />
        <ScrollToTop/>
        <Routes>
          <Route element={<MainLayout/>}>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/sign" element={<SignPage />}/>
            <Route path="/findPass" element={<FindPassPage />}/>
            <Route path="/changePass" element={<ChangePassPage />}/>
            <Route path="/calendar" element={<CalendarPage/>}/>
            <Route path="/information" element={<InformationPage/>}/>
            <Route path="/travel" element={<TravelPage/>}/>
            <Route path="/shared" element={<SharedPlanPage/>}/>
            <Route path="/editMember" element={<EditMemberPage/>}/>
            {/* 마이페이지 페이지 */}
            <Route path="/myPage" element={<MyPage/>}/>
            <Route path='/myComments' element={<MyComments/>} />
            <Route path='/myPlan' element={<MyPlan/>} />
            <Route path='/sharedPlan' element={<SharedPlan/>} />
            <Route path='/like' element={<Like/>} />
            {/*  */}
            <Route path="*" element={<NotFoundPage/>}/>
          </Route>
          <Route path="/createPlanPage" element={<CreatePlanPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
