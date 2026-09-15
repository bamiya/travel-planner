import styled from "styled-components";

export const ContentBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

export const SearchHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 150px 0 40px;

    @media (max-width: 768px) {
        margin: 100px 0 30px;
    }
`

export const SearchTitle = styled.div`
    font-size: 28px;
    font-weight: 800;
    color: var(--color-text);
    margin-bottom: 24px;

    @media (max-width: 480px) {
        font-size: 22px;
    }
`

export const CategoryTabBox = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 18px;
`
export const CategoryTab = styled.button`
    border: 0;
    padding: 9px 22px;
    border-radius: 999px;
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
    width: 600px;
    max-width: 100%;
    height: 56px;
    background-color: var(--color-white);
    box-sizing: border-box;
    padding: 0 6px 0 24px;
    display: flex;
    align-items: center;
    border-radius: 999px;
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-card);
`
export const SearchBtn = styled.div`
    width: 44px;
    height: 44px;
    margin-left: 8px;
    border-radius: 999px;
    background-color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: var(--transition-base);

    &:hover {
        background-color: var(--color-primary-dark);
    }
`
export const ListSumBox = styled.div`
    width: 900px;
    max-width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 10px;
    display: flex;
    font-size: 22px;
    margin-bottom: 16px;
    font-weight: 800;
    color: var(--color-text);
`
export const Input = styled.input`
    margin: 0;
    padding: 0;
    border: 0;
    flex: 1;
    outline: none;
    font-size: 16px;
    box-sizing: border-box;
    font-weight: 500;
    color: var(--color-text);

    &::placeholder {
        color: var(--color-text-muted);
    }
`
export const TravelListBox = styled.div`
    width: 900px;
    max-width: 100%;
`

export const TravelWrapper = styled.div`
    width: 100%;
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

export const Like = styled.button`
    border: none;
    background: ${props => (props.dibs ? "var(--color-success)" : "var(--color-bg)")};
    color: ${props => (props.dibs ? "white" : "var(--color-text-muted)")};
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    padding: 8px 16px;
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

export const FabButton = styled.div`
    position: fixed;
    right: 32px;
    bottom: 32px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 22px;
    background-color: var(--color-primary);
    color: white;
    font-size: 15px;
    font-weight: 700;
    border-radius: 999px;
    box-shadow: var(--shadow-hover);
    cursor: pointer;
    z-index: 20;
    transition: var(--transition-base);

    &:hover {
        background-color: var(--color-primary-dark);
        transform: translateY(-2px);
    }

    svg {
        width: 20px;
        height: 20px;
    }

    @media (max-width: 480px) {
        right: 16px;
        bottom: 16px;
        padding: 12px 18px;
        font-size: 13px;
    }
`
