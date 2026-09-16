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
    max-width: 440px;
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

export const SignText = styled.div`
    font-size: 32px;
    font-weight: 800;
    color: var(--color-text);
    margin-bottom: 32px;

    @media (max-width: 480px) {
        font-size: 26px;
    }
`

export const SignText2 = styled.label`
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 22px;
    color: var(--color-text-muted);
    width: 100%;
    max-width: 350px;
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
    width: 100%;
    max-width: 350px;
    height: 44px;
    background-color: var(--color-success);
    border-radius: 999px;
    margin-top: 12px;
    color: white;
    font-size: 15px;
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

export const AgreeBox = styled.label`
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    max-width: 350px;
    margin-top: 16px;
    padding: 12px 14px;
    background-color: var(--color-bg);
    border-radius: var(--radius-sm);
    font-size: 13px;
    color: var(--color-text);
    cursor: pointer;
`

export const AgreeCheckbox = styled.input.attrs({ type: "checkbox" })`
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    accent-color: var(--color-primary);
    cursor: pointer;
`

export const AgreeLink = styled.a`
    color: var(--color-primary-dark);
    font-weight: 700;
    text-decoration: underline;
`

export const WarningMessage = styled.span`
    font-size: 13px;
    font-weight: 600;
    margin-top: 6px;
    display: inline-block;
    color: ${props => {
        return props.check ? "var(--color-success)" : "var(--color-accent)"
    }}
`
