import React, { useState } from "react";
import styled from "styled-components";

const Row = styled.div`
    display: inline-flex;
    gap: 2px;
`

const Star = styled.span`
    font-size: ${(props) => props.size || "16px"};
    color: ${(props) => (props.filled ? "#FFB400" : "var(--color-border)")};
    cursor: ${(props) => (props.interactive ? "pointer" : "default")};
    line-height: 1;
`

// value: 1~5 (또는 0/null이면 별점 없음). onChange를 주면 클릭해서 고를 수 있는 입력용,
// 안 주면 그냥 읽기 전용 표시용으로 쓴다 (댓글 목록 등).
const StarRating = ({ value, onChange, size }) => {
  const [hover, setHover] = useState(0);
  const interactive = !!onChange;
  const display = interactive && hover > 0 ? hover : value || 0;

  return (
    <Row onMouseLeave={() => interactive && setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          filled={n <= display}
          interactive={interactive}
          onMouseEnter={() => interactive && setHover(n)}
          onClick={() => interactive && onChange(n)}>
          {n <= display ? "★" : "☆"}
        </Star>
      ))}
    </Row>
  );
};

export default StarRating;
