import styled from "styled-components";

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
    font-size: 26px;
    font-weight: 800;
    color: var(--color-text);
    margin-bottom: 32px;

    @media (max-width: 480px) {
        font-size: 22px;
    }
`

export const LoginText2 = styled.div`
    font-size: 15px;
    font-weight: 700;
    color: var(--color-text-muted);
    margin-bottom: 28px;
    width: 100%;
    max-width: 350px;
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
