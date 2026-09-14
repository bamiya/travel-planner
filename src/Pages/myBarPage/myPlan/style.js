import styled from "styled-components";

export const BigBox = styled.div`
    width: 895px;
    margin-left: 155px;
    margin-top: 120px;
    margin-bottom: 100px;

    @media (max-width: 768px) {
        width: 100%;
        max-width: 100%;
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
    margin-bottom: 20px;

    @media (max-width: 768px) {
        width: 100%;
    }
`

export const SmallBox = styled.div`
    width: 895px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-card);
    box-sizing: border-box;
    margin-bottom: 30px;
    transition: var(--transition-base);

    &:hover {
        box-shadow: var(--shadow-hover);
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`

export const LineBox = styled.div`
    width: 885px;
    padding: 30px 0 20px 10px;
    display: flex;

    @media (max-width: 768px) {
        width: 100%;
        flex-direction: column;
        padding: 15px 0;
        box-sizing: border-box;
    }
`

export const ContentBox = styled.div`
    width: 650px;
    height: 120px;
    background-color: var(--color-bg);
    margin-left: 50px;
    border-radius: var(--radius-sm);

    @media (max-width: 768px) {
        width: 100%;
        height: auto;
        margin-left: 0;
        margin-top: 10px;
        padding-bottom: 10px;
        box-sizing: border-box;
    }
`

export const ContentBox2 = styled.div`
    width: 100%;
    height: 60px;
    display: flex;

    @media (max-width: 768px) {
        height: auto;
        flex-wrap: wrap;
    }
`

export const DayBox = styled.div`
    width: 200px;
    font-size: 13px;
    margin-top:20px;
    margin-bottom: 50px;
    font-weight: 600;
    color: var(--color-text-muted);

    @media (max-width: 768px) {
        width: auto;
        margin-left: 10px;
        margin-bottom: 10px;
    }
`

export const NameBox = styled.div`
    width: 100px;
    font-size: 16px;
    margin-top:20px;
    font-weight: 700;
    color: var(--color-text);
    margin-left: 90px;

    @media (max-width: 768px) {
        margin-left: 10px;
    }
`

export const ModifyDeleteBox = styled.div`
    width: 300px;
    height: 20px;
    font-size: 12px;
    margin-top:20px;
    margin-left: 90px;
    margin-right: 30px;
    font-weight: 700;
    border-radius: 90px;
    background-color: var(--color-text-muted);
    color: white;
    text-align: center;
    padding-top: 5px;
    cursor: pointer;
    transition: var(--transition-base);

    &:hover {
        background-color: var(--color-text);
    }

    @media (max-width: 768px) {
        width: auto;
        padding: 5px 15px;
        margin-left: 10px;
        margin-right: 10px;
    }
`

export const ImgBox = styled.img`
    width: 180px;
    height: 120px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    object-fit: cover;

    @media (max-width: 768px) {
        width: 100%;
        height: auto;
        max-height: 200px;
        object-fit: cover;
    }
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
    width: 430px;
    font-size: 15px;
    margin-left: 40px;
    margin-right: 30px;
    font-weight: 500;
    color: var(--color-text);
    margin-top:20px;

    @media (max-width: 768px) {
        width: 100%;
        margin-left: 10px;
        margin-right: 10px;
        box-sizing: border-box;
    }
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
