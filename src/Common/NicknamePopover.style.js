import styled from "styled-components";

export const Wrapper = styled.span`
    position: relative;
    display: inline-block;
`

export const NicknameBtn = styled.button.attrs({ type: "button" })`
    border: none;
    background: none;
    padding: 0;
    font-family: inherit;
    font-weight: 700;
    font-size: 14px;
    color: var(--color-text);
    cursor: pointer;
    transition: var(--transition-base);

    &:hover {
        color: var(--color-primary);
    }
`

export const Popover = styled.div`
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    z-index: 20;
    width: 220px;
    background-color: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-hover);
    padding: 16px;
    box-sizing: border-box;

    &::before {
        content: "";
        position: absolute;
        top: -6px;
        left: 16px;
        width: 12px;
        height: 12px;
        background-color: var(--color-white);
        border-left: 1px solid var(--color-border);
        border-top: 1px solid var(--color-border);
        transform: rotate(45deg);
    }
`

export const Loading = styled.div`
    padding: 8px 0;
    font-size: 13px;
    color: var(--color-text-muted);
    text-align: center;
`

export const PopoverHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
`

export const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    background-color: var(--color-bg);
    flex-shrink: 0;
    cursor: pointer;
    transition: var(--transition-base);

    &:hover {
        opacity: 0.85;
        transform: scale(1.05);
    }
`

export const Lightbox = styled.div`
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.75);
    padding: 40px;
    box-sizing: border-box;
    cursor: pointer;
`

export const LightboxImg = styled.img`
    max-width: min(90vw, 420px);
    max-height: 80vh;
    border-radius: var(--radius-md);
    object-fit: contain;
    background-color: var(--color-white);
    box-shadow: var(--shadow-hover);
    cursor: default;
`

export const LightboxClose = styled.button.attrs({ type: "button" })`
    position: absolute;
    top: 20px;
    right: 24px;
    border: none;
    background: rgba(255, 255, 255, 0.15);
    color: white;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    transition: var(--transition-base);

    &:hover {
        background: rgba(255, 255, 255, 0.3);
    }
`

export const NicknameText = styled.div`
    font-size: 15px;
    font-weight: 800;
    color: var(--color-text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const StatsRow = styled.div`
    display: flex;
    gap: 8px;
`

export const Stat = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 10px 4px;
    background-color: var(--color-bg);
    border-radius: var(--radius-sm);
`

export const StatValue = styled.div`
    font-size: 16px;
    font-weight: 800;
    color: var(--color-primary);
`

export const StatLabel = styled.div`
    font-size: 11px;
    font-weight: 600;
    color: var(--color-text-muted);
`
