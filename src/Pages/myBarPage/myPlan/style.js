import styled from "styled-components";

export const BigBox = styled.div`
    width: 895px;
    max-width: 100%;
    margin: 40px auto 100px;
    box-sizing: border-box;

    @media (max-width: 768px) {
        margin: 24px 0 60px;
        padding: 0 16px;
    }
`

export const SectionTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 24px;
    font-size: 20px;
    font-weight: 800;
    color: var(--color-text);

    &::before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 20px;
        border-radius: 999px;
        background-color: var(--color-primary);
    }
`

export const EmptyText = styled.div`
    padding: 60px 0;
    text-align: center;
    font-size: 15px;
    font-weight: 600;
    color: var(--color-text-muted);
`

export const PlanGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
    }

    @media (max-width: 520px) {
        grid-template-columns: 1fr;
    }
`

export const PlanCard = styled.div`
    background-color: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-card);
    overflow: hidden;
    transition: var(--transition-base);

    &:hover {
        box-shadow: var(--shadow-hover);
        transform: translateY(-3px);
    }
`

export const ImgBox = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
    cursor: pointer;
    background-color: var(--color-bg);
    display: block;
`

export const CardBody = styled.div`
    padding: 16px 18px 18px;
`

export const ContentText = styled.div`
    font-size: 16px;
    font-weight: 700;
    color: var(--color-text);
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const DayBox = styled.div`
    margin-top: 6px;
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text-muted);
`

export const ActionRow = styled.div`
    display: flex;
    gap: 6px;
    margin-top: 14px;
`

export const ModifyDeleteBox = styled.button.attrs({ type: "button" })`
    flex: 1;
    border: none;
    outline: none;
    font-family: inherit;
    padding: 8px 0;
    font-size: 12px;
    font-weight: 700;
    border-radius: 999px;
    cursor: pointer;
    transition: var(--transition-base);
    background-color: ${(props) => (props.danger ? "transparent" : props.primary ? "var(--color-primary-light)" : "var(--color-bg)")};
    color: ${(props) => (props.danger ? "var(--color-accent)" : props.primary ? "var(--color-primary-dark)" : "var(--color-text-muted)")};

    &:hover {
        background-color: ${(props) => (props.danger ? "var(--color-accent)" : props.primary ? "var(--color-primary)" : "var(--color-border)")};
        color: ${(props) => (props.danger || props.primary ? "var(--color-white)" : "var(--color-text)")};
    }
`
