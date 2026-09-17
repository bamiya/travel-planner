import styled from "styled-components";
import Modal from "react-modal";

export const ConfirmModal = styled(Modal)`
    width: 360px;
    max-width: 90vw;
    background-color: var(--color-white);
    border: none;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-hover);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    outline: 0;
    box-sizing: border-box;
    padding: 28px;
`

export const Message = styled.div`
    font-size: 15px;
    font-weight: 600;
    color: var(--color-text);
    line-height: 1.5;
    white-space: pre-line;
    margin-bottom: 24px;
`

export const BtnRow = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
`

export const CancelBtn = styled.button`
    height: 40px;
    padding: 0 18px;
    border-radius: 999px;
    border: 1px solid var(--color-border);
    background-color: var(--color-white);
    color: var(--color-text);
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    transition: var(--transition-base);

    &:hover {
        background-color: var(--color-bg);
    }
`

export const ConfirmBtn = styled.button`
    height: 40px;
    padding: 0 18px;
    border-radius: 999px;
    border: none;
    color: white;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    background-color: ${(props) => (props.danger ? "var(--color-accent)" : "var(--color-primary)")};
    transition: var(--transition-base);

    &:hover {
        background-color: ${(props) => (props.danger ? "var(--color-accent-dark)" : "var(--color-primary-dark)")};
    }
`
