import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    margin: 150px 0;
`
export const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const SignText = styled.div`
    font-size: 52px;
    font-weight: 800;
    color: var(--color-text);
    margin-bottom: 40px;

    @media (max-width: 480px) {
        font-size: 36px;
    }
`

export const SignText2 = styled.label`
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 30px;
    color: var(--color-text-muted);
`

export const ErrorMessage = styled.label`
    font-size: 14px;
    font-weight: 400;
    color: var(--color-accent);
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

export const UserGreenBtn = styled.button`
    width: 150px;
    height: 40px;
    background-color: var(--color-success);
    border-radius: var(--radius-sm);
    margin-top: 20px;
    color: white;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    transition: var(--transition-base);

    &:hover {
        background-color: var(--color-success-dark);
    }
`

export const RadioWrap = styled.div`
    margin: 0 130px 100px;
    display: flex;

    @media (max-width: 480px) {
        margin: 0 20px 40px;
    }
`

export const RadioBtn = styled.input`

`

export const RadioLabel = styled.label`
    
`

export const WarningMessage = styled.span`
    font-size: 14px;
    color: ${props => {
        return props.check ? "green" : "red"
    }}
`