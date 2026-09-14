import styled from "styled-components";
export const ContentBox = styled.div`
    width: 100%;
    display: flex;
`
export const ContentBox1 = styled.div`
    width: 1200px;
    max-width: 100%;
`
export const CategoryTabBox = styled.div`
    display: flex;
    gap: 10px;
    margin: 20px 10px 0;
`
export const CategoryTab = styled.button`
    border: 0;
    padding: 9px 22px;
    border-radius: var(--radius-lg);
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: var(--transition-base);
    background-color: ${(props) => (props.active ? "var(--color-primary)" : "var(--color-bg)")};
    color: ${(props) => (props.active ? "white" : "var(--color-text-muted)")};

    &:hover {
        background-color: ${(props) => (props.active ? "var(--color-primary-dark)" : "var(--color-primary-light)")};
    }
`
export const InputBox = styled.div`
    width: 75%;
    height: 52px;
    background-color: var(--color-white);
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    margin-top: 250px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-card);
`
export const ListSumBox = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    display: flex;
    font-size: 26px;
    margin: 20px 0 10px;
    font-weight: 800;
    color: var(--color-text);
`
export const Input = styled.input`
    margin: 0;
    padding: 0;
    border: 0;
    flex: 1;
    outline: none;
    font-size: 20px;
    box-sizing: border-box;
    padding-left: 9px;
    font-weight: 500;
    color: var(--color-text);

    &::placeholder {
        color: var(--color-text-muted);
    }
`
export const TravelListBox = styled.div`
    width: 100%;
`
export const TravelFilterTag = styled.div`
    width: 330px;
    max-width: 90%;
    height: 590px;
    background: rgba(0, 150, 100, 0.5);
    margin: 20px auto 0 auto;
    border-radius: 20px;
    padding: 30px 0 30px 0;

`
export const GridTagBoxItem = styled.div`
    grid-column : 1;
    grid-row: 1;
    background-color: white;
    margin: 10px 10px 10px 10px;
    border-radius: 20px;
`
export const FilterBoxSticky = styled.div`
    position: sticky;
    top: 90px;
    margin-left: 40px;
    margin-bottom: 20px;
`
export const TravelFilterBox = styled.div`
    display: flex;
    width: 70%;
    margin-top: 15px;   
`
export const TravelFilterTagBox = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(9, minmax(60px, auto));
    grid-gap: 20px;
   
`
export const SteamListButtonBox = styled.div`
    width: 1200px;
    max-width: 100%;
    height: 100px;
    text-align: end;

`
export const TravelWrapper = styled.div`
    width: 900px;
    max-width: 100%;
    padding: 18px;
    display: flex;
    align-items: center;
    gap: 18px;
    background-color: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-card);
    margin-bottom: 16px;
    transition: var(--transition-base);

    &:hover {
        box-shadow: var(--shadow-hover);
        transform: translateY(-2px);
    }

    @media (max-width: 768px) {
        flex-wrap: wrap;
    }
`
export const Image = styled.img`
    width: 160px;
    height: 120px;
    object-fit: cover;
    border-radius: var(--radius-sm);
    cursor: pointer;
    flex-shrink: 0;
    background-color: var(--color-bg);

    @media (max-width: 480px) {
        width: 110px;
        height: 100px;
    }
`
export const Title = styled.div`
    overflow: hidden;
    display: inline-block;
    width: 100%;
    font-weight: bold;
    font-size: 20px;
    color: #000;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 10px;
    
`
export const Txt = styled.div`
    display: flex;
    flex: 1;
    min-width: 0;
    flex-direction: column;
    justify-content: center;
`
export const PlaceTitle = styled.div`
    overflow: hidden;
    display: inline-block;
    width: 100%;
    font-weight: 700;
    font-size: 19px;
    color: var(--color-text);
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 6px;
    cursor: pointer;
`
export const Text = styled.div`
    width: 100%;
    font-size: 30px;
    text-align: center;
    font-weight: bold
 `
 export const Address = styled.div`
    margin-top: 4px;
    font-size: 14px;
    color: var(--color-text-muted);
 `

 export const Tel = styled.div`
    margin-top: 4px;
    font-size: 13px;
    color: var(--color-text-muted);
 `

 export const SteamListButtonImg = styled.img`
    width: 150px;
    height: 150px;
    cursor: pointer;
    position: sticky;
    top: 80%;
    left: 100%;
`
export const Like = styled.button`
    border: none;
    background: ${props => (props.dibs ? "var(--color-success)" : "var(--color-bg)")};
    color: ${props => (props.dibs ? "white" : "var(--color-text-muted)")};
    border-radius: var(--radius-sm);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    padding: 8px 14px;
    white-space: nowrap;
    transition: var(--transition-base);

    &:hover {
        filter: brightness(0.96);
    }
 `
 export const LikeBox = styled.div`
     display: flex;
     flex-direction: column;
     align-items: center;
     gap: 8px;
     flex-shrink: 0;
 `