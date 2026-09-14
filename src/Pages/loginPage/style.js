import styled from "styled-components";
import Modal from 'react-modal';

export const Wrapper = styled.div`
    width: 100%;
    margin: 150px 0;
`
export const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
`

export const LoginText = styled.div`
    font-size: 52px;
    font-weight: 800;
    color: var(--color-text);
    margin-bottom: 40px;

    @media (max-width: 480px) {
        font-size: 36px;
    }
`

export const LoginText2 = styled.div`
    font-size: 15px;
    font-weight: 700;
    color: var(--color-text-muted);
    margin-bottom: 40px;
`

export const KakaoBtn = styled.div`
    width: 100%;
    max-width: 350px;
    height: 44px;
    background-color: #FEE500;
    border-radius: var(--radius-sm);
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
