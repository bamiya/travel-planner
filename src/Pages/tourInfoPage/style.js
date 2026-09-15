import styled from "styled-components";

export const TitleBox = styled.div`
    width: 100%;
    margin-top: 150px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        margin-top: 110px;
    }
`

export const TitleGroup = styled.div`
    flex: 1;
    min-width: 0;
`

export const CategoryChip = styled.div`
    display: inline-flex;
    align-items: center;
    padding: 5px 14px;
    font-size: 12px;
    font-weight: 700;
    color: var(--color-primary-dark);
    background-color: var(--color-primary-light);
    border-radius: 999px;
    margin-bottom: 12px;
    margin-right: 8px;
`

export const PetChip = styled.div`
    display: inline-flex;
    align-items: center;
    padding: 5px 14px;
    font-size: 12px;
    font-weight: 700;
    color: var(--color-success-dark);
    background-color: #E8F7EE;
    border-radius: 999px;
    margin-bottom: 12px;
`

export const Title = styled.div`
    font-size: 30px;
    font-weight: 800;
    color: var(--color-text);
    word-break: keep-all;
`

export const AddressLine = styled.div`
    margin-top: 8px;
    font-size: 14px;
    color: var(--color-text-muted);
`

export const HeartBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const LikeCount = styled.div`
    font-weight: 700;
    color: var(--color-text);
    font-size: 17px;
    margin-left: 5px;
    margin-right: 15px;
`

export const LikeBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-shrink: 0;
`
export const Like = styled.button`
    border: 0;
    width: 96px;
    height: 38px;
    font-weight: 700;
    font-size: 13px;
    background: ${props => (props.dibs ? "var(--color-success)" : "var(--color-accent)")};
    color: white;
    border-radius: 999px;
    margin-left: 15px;
    cursor: pointer;
    transition: var(--transition-base);

    &:hover {
        filter: brightness(0.94);
        transform: translateY(-1px);
    }
`

export const Gallery = styled.div`
    margin: 24px 0 40px;
`

export const GalleryMain = styled.img`
    width: 100%;
    height: 440px;
    object-fit: cover;
    border-radius: var(--radius-lg);
    background-color: var(--color-bg);
    cursor: ${props => (props.zoomable ? "zoom-in" : "default")};

    @media (max-width: 768px) {
        height: 260px;
    }
`

export const GalleryThumbRow = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 12px;
    overflow-x: auto;
    padding-bottom: 4px;
`

export const GalleryThumb = styled.img`
    width: 96px;
    height: 72px;
    object-fit: cover;
    border-radius: var(--radius-sm);
    cursor: pointer;
    flex-shrink: 0;
    opacity: ${props => (props.active ? 1 : 0.55)};
    border: 2px solid ${props => (props.active ? "var(--color-primary)" : "transparent")};
    transition: var(--transition-base);

    &:hover {
        opacity: 1;
    }
`
export const InformationTitle = styled.div`
    font-size: 20px;
    margin-bottom: 18px;
    font-weight: 800;
    color: var(--color-text);
`
export const InformationBox = styled.div`
    width: 100%;
`
export const InfoCard = styled.div`
    background-color: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-card);
    box-sizing: border-box;
    padding: 32px;
    margin-bottom: 24px;

    @media (max-width: 768px) {
        padding: 22px 18px;
    }
`
export const InformationContnet = styled.div`
    font-size: 15px;
    line-height: 1.9;
    color: var(--color-text);
    letter-spacing: 0.2px;
    word-break: keep-all;
    white-space: pre-line;
`

export const Map = styled.div`
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    height:400px;
`
export const DetailedInforBox = styled.div`
    width: 100%;
`
export const DetaBox = styled.div`
    width: 100%;
`
export const DetaFontBox = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 14px 0;
    border-bottom: 1px solid var(--color-border);

    &:last-child {
        border-bottom: 0;
        padding-bottom: 0;
    }

    @media (max-width: 480px) {
        flex-direction: column;
        gap: 4px;
    }
`
export const DetaFont = styled.div`
    font-size: 14px;
    font-weight: 700;
    color: var(--color-text-muted);
    align-self: flex-start;
    width: 120px;
    flex-shrink: 0;
`
export const DetainforMation = styled.div`
    width: 100%;
    color: var(--color-text);
    font-size: 15px;
    align-items: center;
`
export const DetainfoRight = styled.div`
    width: 100%;
    color: var(--color-text);
    font-size: 15px;
    align-items: center;
`
export const Img1 = styled.div`
    margin-top: 15px;
`
export const Title1 = styled.div`
    display: inline-block;
    line-height: 50px;
    font-weight: 800;
    font-size: 28px;
    color: var(--color-text);
    border-bottom: 2.3px solid var(--color-primary);
    width: 36%;
    padding: 25px 0 10px 20px;
    margin-bottom: 20px;
`

export const NearbyBox = styled.div`
    margin-top: 60px;
`

export const NearbyScroll = styled.div`
    display: flex;
    gap: 16px;
    overflow-x: auto;
    padding: 4px 2px 16px;
`

export const NearbyCard = styled.div`
    flex-shrink: 0;
    width: 180px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-card);
    box-sizing: border-box;
    padding: 10px;
    cursor: pointer;
    transition: var(--transition-base);

    &:hover {
        box-shadow: var(--shadow-hover);
        transform: translateY(-2px);
    }
`

export const NearbyImg = styled.img`
    width: 100%;
    height: 120px;
    object-fit: cover;
    border-radius: var(--radius-sm);
    background-color: var(--color-bg);
`

export const NearbyName = styled.div`
    margin-top: 10px;
    font-size: 15px;
    font-weight: 700;
    color: var(--color-text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const NearbyAddr = styled.div`
    margin-top: 4px;
    font-size: 12px;
    color: var(--color-text-muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const NearbyDist = styled.div`
    display: inline-block;
    margin-top: 8px;
    padding: 2px 8px;
    font-size: 11px;
    font-weight: 700;
    color: var(--color-primary-dark);
    background-color: var(--color-primary-light);
    border-radius: 999px;
`

export const Comment1 = styled.div`
    display:flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    margin-top: 100px;
    flex: 1;
    
`

export const CommentBox = styled.div`
    background-color: var(--color-bg);
    width: 100%;
    height: 100%;
    border-radius: var(--radius-lg);
    box-sizing: border-box;
    padding: 0 70px 0 70px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-content: space-between;
    margin-bottom: 30px;

    @media (max-width: 768px) {
        padding: 0 20px;
    }
`

export const ReviewBox = styled.div`
    width: 100%;
    display: flex;
    border-bottom: 1px solid var(--color-border);
    box-sizing: border-box;


`

// export const Review = styled.div`
//     // display: flex;
//     // justify-content: center;
//     // align-self: start;
//     // flex-direction: column;
//     // width: 100%;
//     // border-bottom: 1px solid black;
//     // padding: 5px 5px 0 5px;

    
// `

export const RefirstBox = styled.div` 
    margin-top: 25px;
    margin-left: 10px;
`

export const ReImage = styled.img`
    width: 56px;
    height: 56px;
    border-radius: 50px;
    margin-top: 20px;
    box-shadow: var(--shadow-card);
    object-fit: cover;

`

export const ReName = styled.div`
    left: 70px;
    font-weight: 700;
    color: var(--color-text);
`

export const ReContent = styled.div`
    margin-bottom: 10px;
    color: var(--color-text);
`

export const ReDate = styled.div`
    margin-top: 8px;
    margin-bottom: 10px;
    font-size: 13px;
    color: var(--color-text-muted);
`

export const InputBox = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: flex-start;
    height: 150px;
    margin: 50px 0 50px 0;

    @media (max-width: 768px) {
        flex-wrap: wrap;
        height: auto;
    }
`

export const ReviewTextBox= styled.div`
    position: absolute;
    top: -40px;
`

export const ReviewText= styled.div`
    font-weight: 700;
    color: var(--color-text);
`

export const Profile1 = styled.img`
    top:0;
    left: 0;
    width: 56px;
    height: 56px;
    margin-right: 20px;
    margin-top: 4px;
    border-radius: 50px;
    object-fit: cover;
    box-shadow: var(--shadow-card);
    flex-shrink: 0;
`

export const InputComment = styled.textarea`
    resize: none;
    flex: 1;
    width: auto;
    height: 100px;
    font-size: 15px;
    font-family: inherit;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background-color: var(--color-white);
    padding: 12px 100px 12px 16px;
    box-sizing: border-box;
    transition: var(--transition-base);

    &::placeholder {
        color: var(--color-text-muted);
    }

    &:focus {
        outline: none;
        border-color: var(--color-primary);
    }

    @media (max-width: 768px) {
        padding: 12px;
    }
`

export const InputBtn = styled.button`
    border: none;
    border-radius: var(--radius-sm);
    position: absolute;
    display: flex;
    right: 12px;
    bottom: 12px;
    width: 76px;
    height: 36px;
    background-color: var(--color-primary);
    color: white;

    cursor: pointer;
    font-weight: 700;
    font-size: 15px;
    font-family: inherit;
    justify-content: center;
    align-items: center;
    transition: var(--transition-base);

    &:hover {
        background-color: var(--color-primary-dark);
    }

    @media (max-width: 768px) {
        position: static;
        margin-top: 10px;
        width: 100%;
    }
`