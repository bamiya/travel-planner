import styled from "styled-components";
import Modal from 'react-modal';


export const LoginModal = styled(Modal)`
    position: absolute;
    width: 700px;
    height: 650px;
    background: rgb(255 255 255);
    border-radius: 4px;
    outline: none;
    padding: 0px;
    top: 50%;
    left: 50%;
    transform: translate( -50%, -50%);
    box-shadow: 0px 0px 10px 4px black;
`

export const SignModal = styled(Modal)`
    position: absolute;
    width: 700px;
    height: 650px;
    overflow-y: scroll;
    background: rgb(255 255 255);
    border-radius: 4px;
    outline: none;
    top: 50%;
    left: 50%;
    transform: translate( -50%, -50%);
    box-sizing: border-box;
    padding: 20px 20px;
    box-shadow: 0px 0px 10px 4px black;
`

export const Wrapper = styled.div`
    width: 100%;
    position: fixed;
    z-index: 3;
    display: flex;
    justify-content: center;
    top: 0;
    transition: all .5s;
    background: ${props => {
        let bg;
        if(props.bg){
            bg = "transparent"
        }else{
            bg = "linear-gradient(180deg, rgba(118, 118, 118,1) 5%,  rgba(255,255,255, 0) 100%)"
        }
        if(props.scroll) bg = "var(--color-white)"
        return bg;
    }};
    box-shadow: ${props => (props.scroll ? "0 2px 10px rgba(20,20,43,0.06)" : "none")};
`

export const Header = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const LogoArea = styled.div`
    display: flex;
    align-items: center;
`

export const HamburgerBtn = styled.button`
    position: relative;
    display: none;
    width: 40px;
    height: 40px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: var(--radius-sm);
    transition: var(--transition-base);
    -webkit-tap-highlight-color: transparent;

    &:hover {
        background: var(--color-primary-light);
    }

    @media (max-width: 768px) {
        display: block;
    }
`

export const HamburgerBar = styled.span`
    position: absolute;
    left: 10px;
    top: 19px;
    width: 20px;
    height: 2px;
    border-radius: 2px;
    background: var(--color-text);
    transition: var(--transition-base);

    &::before,
    &::after {
        content: '';
        position: absolute;
        left: 0;
        width: 20px;
        height: 2px;
        border-radius: 2px;
        background: var(--color-text);
        transition: var(--transition-base);
    }

    &::before { top: -6px; }
    &::after { top: 6px; }

    ${props => props.open && `
        background: transparent;

        &::before {
            top: 0;
            transform: rotate(45deg);
        }
        &::after {
            top: 0;
            transform: rotate(-45deg);
        }
    `}
`

export const NavArea = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 2px;
        position: absolute;
        top: 80px;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        padding: 12px 16px 20px;
        background: var(--color-white);
        border-top: 1px solid var(--color-border);
        border-radius: 0 0 var(--radius-lg) var(--radius-lg);
        box-shadow: var(--shadow-hover);
        transform-origin: top;
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
        opacity: ${props => (props.open ? 1 : 0)};
        transform: translateY(${props => (props.open ? "0" : "-8px")});
        visibility: ${props => (props.open ? "visible" : "hidden")};
        pointer-events: ${props => (props.open ? "auto" : "none")};
    }
`

export const LogSign = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
        width: 100%;
        gap: 2px;
        margin-top: 8px;
        padding-top: 10px;
        border-top: 1px solid var(--color-border);
    }
`

export const Menu = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
        width: 100%;
        gap: 2px;
    }
`

export const Text = styled.span`
    font-size: 16px;
    font-weight: 700;
    color: var(--color-text);
    margin: 0px 10px;
    cursor: pointer;
    transition: var(--transition-base);

    &:hover {
        color: var(--color-primary);
    }

    @media (max-width: 768px) {
        display: block;
        width: 100%;
        box-sizing: border-box;
        margin: 0;
        padding: 12px 14px;
        border-radius: var(--radius-sm);

        &:hover {
            background: var(--color-primary-light);
            color: var(--color-primary-dark);
        }
    }
`

export const Img = styled.img`
    cursor: pointer;
    margin-right: 15px;
`

export const MyProfile = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: 2px solid var(--color-primary-light);
    cursor: pointer;
    position: relative;
    transition: var(--transition-base);

    &:hover {
        border-color: var(--color-primary);
    }

    @media (max-width: 768px) {
        width: 100%;
        height: auto;
        border: none;
        border-radius: var(--radius-sm);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 8px 14px;
        box-sizing: border-box;

        &:hover {
            background: var(--color-primary-light);
        }
    }
`

export const MyProfileImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 20px;

    @media (max-width: 768px) {
        width: 32px;
        height: 32px;
        flex-shrink: 0;
    }
`

export const MyProfileListBox = styled.div`
    position: absolute;
    width: 150px;
    background-color: var(--color-white);
    top: 52px;
    left: -60px;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-hover);
    padding: 8px;
    box-sizing: border-box;
    display: ${props => {
        return props.clicked ? "block" : "none"
    }};

    @media (max-width: 768px) {
        position: static;
        width: 100%;
        box-shadow: none;
        padding: 4px 0 0;
        margin-top: 4px;
    }
`

export const MyProfileItem = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 10px 8px;
    border-radius: var(--radius-sm);
    text-align: center;
    color: var(--color-text);
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: var(--transition-base);

    :hover{
        background-color: var(--color-primary-light);
        color: var(--color-primary-dark);
    }
`