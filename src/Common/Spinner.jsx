import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
    to { transform: rotate(360deg); }
`;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${(props) => props.padding || "80px 0"};
`;

const Circle = styled.div`
    width: ${(props) => props.size || "36px"};
    height: ${(props) => props.size || "36px"};
    border: 4px solid #e0e0e0;
    border-top-color: #38b7ff;
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
`;

const Text = styled.div`
    margin-top: 12px;
    color: #888;
    font-size: 14px;
`;

// 데이터 로딩 중임을 보여주는 공용 스피너.
// isLoding/rendering 류 state가 true일 때까지 이걸 대신 렌더링한다.
const Spinner = ({ text, size, padding }) => (
    <Wrapper padding={padding}>
        <Circle size={size} />
        {text && <Text>{text}</Text>}
    </Wrapper>
);

export default Spinner;
