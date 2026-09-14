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
    width: 620px;
    height: 100px;
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
    height: 50%;
    display: flex;

    @media (max-width: 768px) {
        height: auto;
        flex-wrap: wrap;
    }
`
export const ContentBox3 = styled.div`
    width: 520px;

    @media (max-width: 768px) {
        width: 100%;
    }
`
export const DayBox = styled.div`
    width: 520px;
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text-muted);
    margin-top: 15px;
    margin-left: 20px;

    @media (max-width: 768px) {
        width: 100%;
        margin-left: 10px;
        box-sizing: border-box;
    }
`
export const NameBox = styled.div`
    width: 100px;
    font-size: 16px;
    margin-top:30px;
    font-weight: 700;
    color: var(--color-text);
    margin-left: 90px;

    @media (max-width: 768px) {
        margin-left: 10px;
    }
`
export const HeartSumText = styled.div`
    width: 100px;
    font-size: 16px;
    margin-top:35px;
    font-weight: 700;
    color: var(--color-text-muted);
    margin-left: 10px;
    margin-right: 290px;

    @media (max-width: 768px) {
        margin-right: 10px;
    }
`

export const ModifyDeleteBox = styled.div`
    width: 100px;
    height: 20px;
    font-size: 12px;
    margin-top:35px;
    margin-right: 30px;
    font-weight: 700;
    border-radius: 100px;
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
        margin-left: 10px;
        margin-right: 10px;
    }
`

export const ImgBox = styled.img`
    width: 220px;
    height: 100px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    object-fit: cover;

    @media (max-width: 768px) {
        width: 100%;
        height: auto;
        max-height: 180px;
        object-fit: cover;
    }
`
export const Imgheart = styled.div`
    width: 35px;
    height: 35px;
    margin-left: 20px;
    margin-top: 30px;
    display: flex;

    @media (max-width: 768px) {
        margin-left: 10px;
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
    margin-left: 20px;
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
