import styled from "styled-components";


export const TitleBox = styled.div`
    width: 100%;
    margin-top: 200px;
`
export const Title = styled.div`
    font-size: 30px;
    font-weight: 500px;
    margin-top: 20px;
    margin-bottom: 40px;
    text-align: center;
    font-weight: bold;
`
export const TopBar = styled.div` 
    width: 100%;
    height: 3px;
   // margin-top: 10px;
    margin-bottom: 30px;
    background-color: grey ;
    opacity: 0.2;
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
    border-radius: 12px;
    cursor: pointer;
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
    font-weight: bold;
    cursor: pointer;
`
export const ContentListBox = styled.div`
    width: 300px;
    max-width: 100%;
    height: 140px;
    margin-top: 10px;
    border: 0.5px solid black;
    border-radius: 15px;
    box-sizing: border-box;
    padding: 15px 15px 0;
    display: flex;
    flex-direction: column;
`
export const LatestpopularBox =styled.div`
    //background-color: white;
    width: 115px;
    margin-left: 1050px;
    margin-bottom: 10px;
    display: flex;

    @media (max-width: 1200px) {
        margin-left: auto;
        margin-right: 15px;
    }
`
export const LatestBtn = styled.button`
    border: none;
    cursor: pointer;
    background-color: white;
    font-weight: ${props => {
        if(props.click) return "bold" 
        else return "none"
    }};
`
export const PopularBtn = styled.button`
    border: none;
    cursor: pointer;
    background-color: white;
    font-weight: ${props => {
        if(props.click) return "bold" 
        else return "none"
    }};
`
export const Sign = styled.div`

`

export const PlanLodingText = styled.div`
    margin-top: 10px;
    font-weight: bold;
    font-size: 20px;
`