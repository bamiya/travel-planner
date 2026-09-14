import styled from "styled-components";

export const BigBox = styled.div`
    width: 895px;
    margin-left: 155px;
    margin-top: 120px;
    margin-bottom: 100px;

    @media (max-width: 768px) {
        width: 100%;
        margin-left: 0;
        margin-top: 100px;
        padding: 0 15px;
        box-sizing: border-box;
    }
`

export const Box = styled.div`
    width: 250px;
    height: 60px;
    background-color: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    margin-bottom: 30px;

    @media (max-width: 768px) {
        width: 100%;
    }
`

export const SmallBox = styled.div`
    width: 895px;
    border-radius: var(--radius-md);
    margin-bottom: 30px;

    @media (max-width: 768px) {
        width: 100%;
    }
`

export const LineBox = styled.div`
    width: 800px;
    height: 100px;
    margin-bottom: 10px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-card);
    background-color: var(--color-white);
    display: flex;
    cursor: pointer;
    transition: var(--transition-base);
    box-sizing: border-box;

    &:hover {
        box-shadow: var(--shadow-hover);
    }

    @media (max-width: 768px) {
        width: 100%;
        height: auto;
        flex-direction: column;
    }
`

export const ContentBox = styled.div`
    width: 500px;
    margin-left: 50px;
    margin-top:10px;
    margin-bottom: 10px;

    @media (max-width: 768px) {
        width: 100%;
        margin-left: 0;
        box-sizing: border-box;
        padding: 0 10px;
    }
`

export const DayBox = styled.div`
    width: 100px;
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text-muted);
    margin-top:50px;
    margin-bottom: 50px;
    text-align: center;

    @media (max-width: 768px) {
        margin-top: 15px;
        margin-bottom: 10px;
    }
`

export const ImgBox = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 100%;
    margin-top: 10px;
    margin-left: 10px;
    cursor: pointer;
    box-shadow: var(--shadow-card);
`

export const Text = styled.div`
    width: 100%;
    font-size: 16px;
    text-align: center;
    padding-top: 20px;
    font-weight: 700;
    color: var(--color-text-muted);
`

export const ContentText = styled.div`
    width: 100%;
    font-size: 16px;
    padding-top: 5px;
    font-weight: 700;
    color: var(--color-text);
`
export const ContentTe = styled.div`
    width: 100%;
    font-size: 14px;
    padding-top: 5px;
    margin-top: 10px;
    color: var(--color-text-muted);
`

export const PageText = styled.div`
    width: 900px;
    font-size: 16px;
    font-weight: 700;
    color: var(--color-text-muted);
    text-align: center;

    @media (max-width: 768px) {
        width: 100%;
    }
`
