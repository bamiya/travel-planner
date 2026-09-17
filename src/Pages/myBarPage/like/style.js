import styled from "styled-components";

export const BigBox = styled.div`
    width: 895px;
    max-width: 100%;
    margin: 40px auto 60px;
    box-sizing: border-box;

    @media (max-width: 768px) {
        margin: 24px 0 40px;
        padding: 0 16px;
    }
`

export const Section = styled.div`
    margin-bottom: 48px;
`

export const SectionTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 800;
    color: var(--color-text);

    &::before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 18px;
        border-radius: 999px;
        background-color: var(--color-primary);
    }
`

export const EmptyText = styled.div`
    padding: 40px 0;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-muted);
`

export const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 14px;
    }

    @media (max-width: 520px) {
        grid-template-columns: 1fr;
    }
`

export const Card = styled.div`
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
    height: 130px;
    object-fit: cover;
    cursor: pointer;
    background-color: var(--color-bg);
    display: block;
`

export const CardBody = styled.div`
    padding: 14px 16px 16px;
`

export const ContentText = styled.div`
    font-size: 15px;
    font-weight: 700;
    color: var(--color-text);
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const AddressText = styled.div`
    margin-top: 5px;
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text-muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const CardFooterRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-top: 12px;
`

export const NameText = styled.div`
    font-size: 11px;
    font-weight: 600;
    color: var(--color-text-muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const HeartBtn = styled.button.attrs({ type: "button" })`
    flex-shrink: 0;
    border: none;
    background: none;
    padding: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: var(--color-accent);
    font-size: 18px;
`

export const CancelBtn = styled.button.attrs({ type: "button" })`
    width: 100%;
    border: none;
    outline: none;
    font-family: inherit;
    padding: 7px 0;
    font-size: 12px;
    font-weight: 700;
    border-radius: 999px;
    cursor: pointer;
    transition: var(--transition-base);
    background-color: var(--color-bg);
    color: var(--color-text-muted);
    margin-top: 12px;

    &:hover {
        background-color: var(--color-accent);
        color: white;
    }
`
