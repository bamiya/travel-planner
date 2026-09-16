import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { MarginTopWrapper } from '../../Common/style';
import * as Styles from './style';

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return(
        <Styles.Wrapper open={location.pathname === '/CreatePlanPage' ? false : true}>
            <MarginTopWrapper>
                <Styles.Inner>
                    <Styles.LogoBox>
                        <Styles.Img src={"assets/logo.png"} alt="logo"/>
                        <Styles.LogoTitle>TRAVEL PLANNER</Styles.LogoTitle>
                    </Styles.LogoBox>
                    <Styles.LinkBox>
                        <Styles.Link onClick={() => navigate("/terms")}>이용약관</Styles.Link>
                        <Styles.Link onClick={() => navigate("/privacyPolicy")}>개인정보처리방침</Styles.Link>
                    </Styles.LinkBox>
                    <Styles.Copyright>© {new Date().getFullYear()} TRAVEL PLANNER. All rights reserved.</Styles.Copyright>
                </Styles.Inner>
            </MarginTopWrapper>
        </Styles.Wrapper>
    )
}

export default Footer