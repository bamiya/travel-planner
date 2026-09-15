import styled from "styled-components";
import Modal from 'react-modal';

export const Wrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 150px 20px 80px;
    display: flex;
    justify-content: center;

    @media (max-width: 480px) {
        padding: 110px 16px 60px;
    }
`
export const AuthCard = styled.div`
    width: 100%;
    max-width: 420px;
    background-color: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-card);
    box-sizing: border-box;
    padding: 48px 36px;

    @media (max-width: 480px) {
        padding: 36px 24px;
    }
`
export const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const LoginText = styled.div`
    font-size: 32px;
    font-weight: 800;
    color: var(--color-text);
    margin-bottom: 32px;

    @media (max-width: 480px) {
        font-size: 26px;
    }
`

export const OrDivider = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    max-width: 350px;
    margin: 4px 0 16px;
    color: var(--color-text-muted);
    font-size: 12px;
    font-weight: 600;

    &::before,
    &::after {
        content: "";
        flex: 1;
        height: 1px;
        background-color: var(--color-border);
    }
`

export const LoginText2 = styled.div`
    font-size: 15px;
    font-weight: 700;
    color: var(--color-text-muted);
    margin-bottom: 24px;
    width: 100%;
    max-width: 350px;
`

export const KakaoBtn = styled.div`
    width: 100%;
    max-width: 350px;
    height: 44px;
    background-color: #FEE500;
    border-radius: 999px;
    margin-top: 10px;
    margin-bottom: 10px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 15px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: var(--transition-base);

    &:hover {
        filter: brightness(0.96);
    }
`

export const Input = styled.input`
    margin: 0;
    border: 1px solid var(--color-border);
    outline: none;
    font-size: 15px;
    font-weight: 450;
    display: block;
    width: 100%;
    max-width: 350px;
    height: 44px;
    border-radius: var(--radius-sm);
    box-sizing: border-box;
    padding: 0 0 0 12px;
    background-color: var(--color-bg);
    margin-top: 7px;
    transition: var(--transition-base);

    &:focus {
        border-color: var(--color-primary);
        background-color: var(--color-white);
    }
`

export const FindSignWrap = styled.div`
    display: flex;
`

export const FindSignText = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-muted);
    margin-bottom: 40px;
    cursor: pointer;

    &:hover {
        color: var(--color-primary-dark);
    }
`

export const FindPassModal = styled(Modal)`
    position: absolute;
    width: 700px;
    max-width: 90vw;
    height: 600px;
    max-height: 85vh;
    background: var(--color-white);
    border-radius: var(--radius-lg);
    outline: none;
    top: 50%;
    left: 50%;
    transform: translate( -50%, -50%);
    box-sizing: border-box;
    padding: 20px 20px;
    box-shadow: var(--shadow-hover);
    overflow-y: auto;
`
