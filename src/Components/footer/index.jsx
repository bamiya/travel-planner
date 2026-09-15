import React from "react";
import { useLocation } from 'react-router-dom';
import { MarginTopWrapper } from '../../Common/style';
import * as Styles from './style';

const Footer = () => {
    const location = useLocation();
    return(
        <Styles.Wrapper open={location.pathname === '/CreatePlanPage' ? false : true}>
            <MarginTopWrapper>
                <Styles.Inner>
                    <Styles.LogoBox>
                        <Styles.Img src={"assets/logo.png"} alt="logo"/>
                        <Styles.LogoTitle>TRAVEL PLANNER</Styles.LogoTitle>
                    </Styles.LogoBox>
                    <Styles.Copyright>© {new Date().getFullYear()} TRAVEL PLANNER. All rights reserved.</Styles.Copyright>
                </Styles.Inner>
            </MarginTopWrapper>
        </Styles.Wrapper>
    )
}

export default Footer