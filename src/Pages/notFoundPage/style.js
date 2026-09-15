import styled from "styled-components";
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 300px 0px;
`

export const ErrorCode = styled.div`
    font-weight: 800;
    font-size: 100px;
    color: var(--color-primary);
`

export const ErrorContent = styled.div`
    font-weight: 500;
    color: var(--color-text-muted);
    margin: 20px 0px;
`

export const Button = styled(Link)`
    width: 120px;
    height: 44px;
    background-color: var(--color-primary);
    border-radius: 999px;
    border: 0;
    color: white;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition-base);

    &:hover {
        background-color: var(--color-primary-dark);
    }
`