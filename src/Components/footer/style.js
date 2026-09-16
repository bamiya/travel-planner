import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    background-color: #12141a;
    padding: 36px 0;
    display: ${props => {
        return props.open ? "flex" : "none"
    }};
`

export const Inner = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
`

export const LogoBox = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const LogoTitle = styled.div`
    font-weight: 700;
    letter-spacing: 0.02em;
    color: whitesmoke;
    font-size: 16px;
`

export const Img = styled.img`
    width: 32px;
    height: 32px;
    object-fit: contain;
`

export const Copyright = styled.div`
    color: rgba(255, 255, 255, 0.45);
    font-size: 13px;
`

export const LinkBox = styled.div`
    display: flex;
    align-items: center;
    gap: 18px;
`

export const Link = styled.div`
    color: rgba(255, 255, 255, 0.65);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition-base);

    &:hover {
        color: var(--color-white);
    }
`
