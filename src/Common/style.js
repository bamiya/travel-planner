import styled from "styled-components";

export const MarginTopWrapper = styled.div`
    width: 100%;
    max-width: 1200px;
    box-sizing: border-box;
    padding: 0 20px;
    margin: ${props => {
        return props.margin ? "80px auto 0 auto" : "0 auto"
    }};
`


// 팝업 회원쪽 공용 스타일

export const UserBlueBtn = styled.button`
    width: 100%;
    max-width: 350px;
    height: 44px;
    background-color: var(--color-primary);
    margin-top: 20px;
    color: white;
    font-size: 15px;
    font-weight: 700;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    transition: var(--transition-base);

    &:hover {
        background-color: var(--color-primary-dark);
    }
`