import styled from "styled-components";

export const BigBox = styled.div`
    width: 100%;
    display: flex;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`

export const Box = styled.div`
    width: 130px;
    height: 40px;
    background-color: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    margin-left: 35px;
    margin-top: 60px;

    @media (max-width: 768px) {
        margin-left: 15px;
        margin-top: 100px;
    }
`

export const Box2 = styled.div`
    width: 100%;
    background-color: var(--color-white);
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-card);
    border-radius: var(--radius-md);
    box-sizing: border-box;
    display: flex;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`

export const SmallBox = styled.div`
    width: 100%;
`
export const SmallBox2 = styled.div`
    width: 1100px;
    border-radius: var(--radius-md);
    margin-bottom: 30px;
    margin-left: 35px;
    margin-right: 35px;

    @media (max-width: 768px) {
        width: 100%;
        margin-left: 15px;
        margin-right: 15px;
        box-sizing: border-box;
    }
`

export const LineBox = styled.div`
    width: 1000px;
    padding: 30px 0 10px 0;
    display: flex;

    @media (max-width: 768px) {
        width: 100%;
        flex-direction: column;
    }
`

export const ContentBox = styled.div`
    width: 100%;
    height: 120px;
    border-radius: var(--radius-sm);

    @media (max-width: 768px) {
        height: auto;
    }
`

export const ContentBox2 = styled.div`
    width: 100%;
    height: 50px;
    display: flex;

    @media (max-width: 768px) {
        height: auto;
        flex-wrap: wrap;
    }
`

export const DayBox = styled.div`
    width: 550px;
    font-size: 14px;
    margin-top: 20px;
    text-align: center;
    font-weight: 600;
    color: var(--color-text-muted);

    @media (max-width: 768px) {
        width: auto;
    }
`

export const NameBox = styled.div`
    width: 450px;
    font-size: 16px;
    margin-top:35px;
    font-weight: 700;
    color: var(--color-text);
    text-align :center ;

    @media (max-width: 768px) {
        width: auto;
    }
`
export const HeartSumText = styled.div`
    margin-top: 10px;
`

export const KeepDeleteBox = styled.div`
    width: 80px;
    height: 20px;
    font-size: 12px;
    margin-top:50px;
    margin-left: 20px;
    margin-right: 50px;
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
        margin-right: 10px;
    }
`

export const KeepDeleteBox2 = styled.div`
    width: 100px;
    height: 20px;
    margin-top:50px;
    margin-right: 30px;
    text-align: center;

    @media (max-width: 768px) {
        margin-right: 10px;
    }
`

export const ImgBox = styled.img`
    width: 100px;
    height: 100px;
    border-radius: var(--radius-sm);
    margin-top: 10px;
    margin-left: 10px;
    cursor: pointer;
    object-fit: cover;
`

export const ImgBox2 = styled.img`
    min-width: 200px;
    height: 150px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    object-fit: cover;

    @media (max-width: 768px) {
        width: 100%;
        min-width: 0;
        height: auto;
        max-height: 200px;
        object-fit: cover;
    }
`

export const Imgheart = styled.div`
    width: 400px;
    height: 35px;
    margin-left: 25px;
    margin-top: 25px;
    display: flex;

    @media (max-width: 768px) {
        width: auto;
        margin-left: 15px;
    }
`

export const Text = styled.div`
    width: 130px;
    font-size: 16px;
    text-align: center;
    padding-top: 10px;
    font-weight: 700;
    color: var(--color-text-muted);
`

export const ContentText = styled.div`
    width: 400px;
    font-size: 15px;
    margin-left: 20px;
    font-weight: 500;
    color: var(--color-text);
    margin-top:20px;
    cursor: pointer;

    @media (max-width: 768px) {
        width: auto;
        margin-left: 15px;
    }
`

export const LikeText = styled.div`
    width: 200px;
    height: 50px;
    padding-top: 20px;
    font-size: 20px;
    text-align: center;
    font-weight: 800;
    color: var(--color-text);
    background-color: var(--color-primary-light);
    border-radius: var(--radius-md);
    margin-left: 40px;
    margin-top: 120px;

    @media (max-width: 768px) {
        width: auto;
        margin-left: 15px;
        margin-right: 15px;
        margin-top: 100px;
    }
`

export const LikesListBox1 = styled.div`
    width: 100%;
    margin-left: 35px;

    @media (max-width: 768px) {
        margin-left: 0;
        padding: 0 15px;
        box-sizing: border-box;
    }
`

export const KeepBox = styled.div`
    width: 900px;
    height: 120px;
    border-radius: var(--radius-sm);

    @media (max-width: 768px) {
        width: 100%;
        height: auto;
    }
`

export const KeepBox2 = styled.div`
    width: 100%;
    height: 50px;
    display: flex;

    @media (max-width: 768px) {
        height: auto;
        flex-wrap: wrap;
    }
`
export const KeepBox3 = styled.div`
    width: 100%;
    background-color: var(--color-white);
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-card);
    border-radius: var(--radius-md);
    box-sizing: border-box;
    display: flex;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`

export const AddressText = styled.div`
    width: 300px;
    font-size: 14px;
    text-align: center;
    margin-top: 20px;
    font-weight: 600;
    color: var(--color-text-muted);

    @media (max-width: 768px) {
        width: auto;
    }
`

export const KeepContentText = styled.div`
    width: 650px;
    height: 70px;
    font-size: 14px;
    margin-left: 20px;
    margin-top:10px;
    overflow: hidden;
    line-height: 17.5px;
    color: var(--color-text-muted);
    display: -webkit-box;
    overflow: hidden;
    word-break: keep-all;
    text-overflow: ellipsis;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;

    @media (max-width: 768px) {
        width: auto;
        margin-left: 15px;
        margin-right: 15px;
    }
`
