import styled from "styled-components";

export const Title = styled.div`
    font-size: 30px;
    font-weight: 500px;
    margin-bottom: 40px;
    text-align: center;
    font-weight: bold;
`
export const TitleBox = styled.div`
    width: 100%;
    margin-top: 200px;
`

export const HeartBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const LikeCount = styled.div`
    font-weight: bold;
    font-size: 17px;
    margin-left: 5px;
    margin-right: 15px;
`

export const LikeBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
`
export const Like = styled.button`
    border: 0;
    width: 90px;
    height: 34px;
    font-weight: 700;
    font-size: 13px;
    background: ${props => (props.dibs ? "var(--color-success)" : "var(--color-accent)")};
    color: white;
    border-radius: var(--radius-sm);
    margin-left: 15px;
    cursor: pointer;
    transition: var(--transition-base);

    &:hover {
        filter: brightness(0.94);
    }
`
export const TopBar = styled.div` 
    width: 100%;
    height: 3px;
    //margin-top: 10px;
    margin-bottom: 30px;
    background-color: grey ;
    opacity: 0.2;
`
export const TitleImgBox = styled.div`
   margin-bottom: 30px;
`
export const InformationTitle = styled.div`
    font-size: 21px;
    margin-bottom: 20px;
    font-weight: 800;
    color: var(--color-text);
`
export const InformationBox = styled.div`
    width: 100%;
`
export const TalkMessageBox = styled.div`
    margin-bottom: 50px;
    background-color: var(--color-bg);
    border-radius: var(--radius-lg);
    box-sizing: border-box;
    padding: 50px 70px;

    @media (max-width: 768px) {
        padding: 30px 20px;
    }
`
export const InformationContnet = styled.div`
    font-size: 16px;
    line-height: 1.9;
    color: var(--color-text);
    letter-spacing: 0.2px;
    word-break: keep-all;
    white-space: pre-line;
    background-color: var(--color-bg);
    border-radius: var(--radius-md);
    box-sizing: border-box;
    padding: 24px 26px;
    margin-bottom: 30px;
`

export const Talk = styled.div`
    font-size: 25px;
    font-weight: bold;
`
export const Msg = styled.div`
    font-size: 10px;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 10px;
`
export const InformationBar = styled.div`
    width: 600px;
    max-width: 100%;
    height: 1px;
    margin-top: 10px;
    margin-bottom: 20px;
    margin-right: 35px;
    background-color: var(--color-border);
`
export const MessageBar = styled.div`
    width: 100%;
    height: 1px;
    background-color: var(--color-border);
`
export const MessageInput = styled.textarea`
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    flex: 1;
    height: 100px;
    font-size: 16px;
    padding: 12px;
    background-color: var(--color-white);
    margin: 0 40px;
    resize: none;

    &:focus {
        outline: none;
        border-color: var(--color-primary);
    }
`
export const MessageCommentsBox = styled.div`
    margin-bottom: 200px;
`
export const MessageCommentBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #9ea4aa;
    box-sizing: border-box;
    padding: 15px 0;
    width: 90%;
`
export const MessageCommentIcon = styled.div` // 나중에 img 로 바꿀꺼
    width: 35px;
    height: 35px;
    border-radius: 17.5px;
    background-color: var(--color-primary-light);
    margin-right: 180px;

    @media (max-width: 768px) {
        margin-right: 20px;
    }
`
export const Comment = styled.div`
    font-size: 15px;
    margin-bottom: 1px;
    margin-top:1px; 
    flex: 1;
`
export const Days = styled.div`
    font-size: 15px;
    font-weight: bold;
`
export const MessageBtn = styled.button`
    border: 0;
    width: 70px;
    height: 32px;
    font-weight: 700;
    background: var(--color-primary);
    color: white;
    border-radius: var(--radius-sm);
    align-self: flex-end;
    cursor: pointer;
    transition: var(--transition-base);

    &:hover {
        background: var(--color-primary-dark);
    }
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
    margin-bottom:30px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
`
export const DetaBox = styled.div`
    width: 100%;
`
export const DetaFontBox = styled.div`
    display: flex;
`
export const DetaFont = styled.div`
    font-size: 20px;
    font-weight: bold;
    align-self: flex-start;
    width: 40%;
`
export const DetainforMation = styled.div`
    margin-bottom: 30px;
    width: 70%;    
    align-items: center;
`
export const DetainfoRight = styled.div`
    margin-bottom: 30px;
    width: 70%;    
    align-items: center;
`
export const Img1 = styled.div`
    margin-top: 15px;
`
export const Titleimage = styled.img`
    width: 100%;
    max-height: 480px;
    object-fit: cover;
    border-radius: var(--radius-lg);
    background-color: var(--color-bg);
`
export const Profile = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 17.5px;
    align-self: flex-start;
`
export const MymessageBox = styled.div`
    border-top: 3px solid #9ea4aa;
`
export const Reviewcomment = styled.div`
    margin-bottom: 15px;
`
export const MyWriting = styled.div`
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

//페이지네이션 댓글 나의 글쓰기 밑에 만들기 라이브러리 사용예정 



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