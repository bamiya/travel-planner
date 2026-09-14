import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    background-color: #151515;
    display: flex;
    align-items: center;
    display: ${props => {
        return props.open ? "flex" : "none"
    }};
`

export const LogoBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const LogoTitle = styled.div`
    font-weight: bold;
    color: whitesmoke;
    font-size: large;
`

export const Img = styled.img`
    width: 110px;
`

export const IconBox = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
`

export const IconItem = styled.div`
    text-align: center;
`

export const Icon = styled.img`
    width: 56px;
    border-radius: 30px;
    cursor: pointer;
    margin: 0 10px;
    transition: var(--transition-base);
    opacity: 0.85;

    &:hover {
        opacity: 1;
        transform: translateY(-3px);
    }
`

export const IconText = styled.div`
    color: var(--color-text-muted);
    font-size: 12px;
    font-weight: 600;
    margin-top: 6px;
`