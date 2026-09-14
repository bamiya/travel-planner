import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    margin: 250px 0;
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