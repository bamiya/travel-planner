import styled from "styled-components";


export const TitleBox = styled.div`
    width: 100%;
    margin-top: 200px;
`
export const Title = styled.div`
    font-size: 28px;
    margin-top: 20px;
    margin-bottom: 40px;
    text-align: center;
    font-weight: 800;
    color: var(--color-text);
`
export const TopBar = styled.div`
    width: 100%;
    height: 1px;
    margin-bottom: 30px;
    background-color: var(--color-border);
`
export const PlanBox = styled.div` //전체박스
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    margin-bottom: 100px;

    @media (max-width: 900px) {
        grid-template-columns: repeat(2,1fr);
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`
export const PlanContentBox = styled.div` //첫번째 내용박스
    margin: 50px 50px 50px;

    @media (max-width: 768px) {
        margin: 25px 15px;
    }
`
export const PlanImg = styled.img`
    width: 300px;
    max-width: 100%;
    height: 200px;
    border-radius: var(--radius-md);
    cursor: pointer;
    object-fit: cover;
`
export const LikeImg = styled.img`
    width: 25px;
    margin-right: 5px;
    cursor: pointer;
`
export const LikeListfontBox = styled.div` 
    width: 100%;
    flex: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
export const LikefontBox = styled.div`
    display: flex;
`
export const ContentBox = styled.div`
    font-size: 16px;
    margin-left: 10px;
    font-weight: 700;
    color: var(--color-text);
    cursor: pointer;
`
export const ContentListBox = styled.div`
    width: 300px;
    max-width: 100%;
    height: 140px;
    margin-top: 10px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-card);
    box-sizing: border-box;
    padding: 15px 15px 0;
    display: flex;
    flex-direction: column;
    transition: var(--transition-base);

    &:hover {
        box-shadow: var(--shadow-hover);
    }
`
export const LatestpopularBox = styled.div`
    display: inline-flex;
    margin-left: auto;
    margin-bottom: 10px;
    padding: 4px;
    background-color: var(--color-bg);
    border-radius: 999px;
`
export const LatestBtn = styled.button`
    border: none;
    cursor: pointer;
    padding: 6px 16px;
    border-radius: 999px;
    font-size: 13px;
    background-color: ${props => props.click ? "var(--color-white)" : "transparent"};
    box-shadow: ${props => props.click ? "var(--shadow-card)" : "none"};
    color: ${props => props.click ? "var(--color-primary-dark)" : "var(--color-text-muted)"};
    font-weight: ${props => {
        if(props.click) return "700"
        else return "500"
    }};
    transition: var(--transition-base);
`
export const PopularBtn = styled.button`
    border: none;
    cursor: pointer;
    padding: 6px 16px;
    border-radius: 999px;
    font-size: 13px;
    background-color: ${props => props.click ? "var(--color-white)" : "transparent"};
    box-shadow: ${props => props.click ? "var(--shadow-card)" : "none"};
    color: ${props => props.click ? "var(--color-primary-dark)" : "var(--color-text-muted)"};
    font-weight: ${props => {
        if(props.click) return "700"
        else return "500"
    }};
    transition: var(--transition-base);
`
export const Sign = styled.div`
    display: none;
`

export const PlanLodingText = styled.div`
    margin-top: 10px;
    font-weight: 700;
    color: var(--color-text-muted);
    font-size: 18px;
`