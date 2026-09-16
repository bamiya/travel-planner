import styled from "styled-components";

export const Wrapper = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`

export const ImageBox = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 420px;
    margin-top: 90px;
    background-color: var(--color-bg);

    &::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.55) 100%);
        pointer-events: none;
    }

    @media (max-width: 768px) {
        height: 300px;
    }
`

export const Profile1 = styled.img`
    width: 44px;
    height: 44px;
    margin-right: 12px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: var(--shadow-card);
    border: 2px solid var(--color-white);
`

export const Title1 = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 800;
    font-size: 22px;
    color: var(--color-text);
    margin-bottom: 20px;

    &::before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 20px;
        border-radius: 999px;
        background-color: var(--color-primary);
    }
`

export const Comment1 = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    margin-top: 60px;
`

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export const IntroTitle = styled.div`
    position: absolute;
    z-index: 1;
    display: flex;
    flex-direction: column;
    left: 60px;
    bottom: 36px;

    @media (max-width: 768px) {
        left: 20px;
        right: 20px;
    }
`
export const IntroText = styled.div`
    font-size: 34px;
    font-weight: 800;
    color: ${(props) => (props.color === "true" ? "white" : "var(--color-text)")};

    @media (max-width: 480px) {
        font-size: 26px;
    }
`

export const IntroDate = styled.div`
    margin-top: 6px;
    font-size: 15px;
    font-weight: 600;
    color: ${(props) => (props.color === "true" ? "rgba(255,255,255,0.85)" : "var(--color-text-muted)")};
`

export const IntroNE = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 14px;
`

export const IntroName = styled.div`
    font-size: 15px;
    font-weight: 700;
    color: ${(props) => (props.color === "true" ? "white" : "var(--color-text)")};
`

export const IntroEmail = styled.div`
    font-size: 13px;
    color: ${(props) => (props.color === "true" ? "rgba(255,255,255,0.75)" : "var(--color-text-muted)")};
`

export const ShareBtnBox = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin: 24px 0 8px;
`

export const ShareBtn = styled.button`
    display: flex;
    border: none;
    cursor: pointer;
    background: ${(props) => (!props.open ? "url(/assets/lockon.png) " : "url(/assets/lockoff.png) ") + "no-repeat scroll 0 0 transparent"};
    background-size: contain;
    min-width: 44px;
    min-height: 44px;
`

export const HeartBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    background-color: var(--color-bg);
    border-radius: 999px;
`

export const LikeCount = styled.div`
    font-weight: 700;
    font-size: 15px;
    color: var(--color-text);
`

export const ContentBox = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: 60px;
`

export const Menu = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const Title = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 800;
    font-size: 22px;
    color: var(--color-text);
    margin-bottom: 20px;

    &::before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 20px;
        border-radius: 999px;
        background-color: var(--color-primary);
    }
`
export const Box = styled.div`
    display: flex;
    gap: 24px;
    align-items: flex-start;

    @media (max-width: 900px) {
        flex-direction: column;
    }
`

export const PlanInfoList = styled.div`
    display: flex;
    flex: 1;
    min-width: 0;
    flex-direction: column;
`

export const DayList = styled.div`
    display: flex;
    padding: 20px 0;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-border);
    }

    @media (max-width: 560px) {
        flex-direction: column;
    }
`

export const Day = styled.div`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 40px;
    font-weight: 700;
    font-size: 15px;
    color: var(--color-primary-dark);
    background-color: var(--color-primary-light);
    border-radius: var(--radius-sm);
    margin-right: 16px;

    @media (max-width: 560px) {
        width: fit-content;
        padding: 6px 14px;
        margin-right: 0;
        margin-bottom: 12px;
    }
`

export const PlaceInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px;
    border-radius: var(--radius-md);
    background-color: var(--color-white);
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-card);
    transition: var(--transition-base);

    &:not(:last-child) {
        margin-bottom: 12px;
    }

    &:hover {
        box-shadow: var(--shadow-hover);
    }
`

export const PlanImage = styled.img`
    cursor: pointer;
    flex-shrink: 0;
    width: 84px;
    height: 84px;
    object-fit: cover;
    border-radius: var(--radius-sm);
    background-color: var(--color-bg);
`

export const Text = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    min-width: 0;
`

export const PlaceTitle = styled.div`
    cursor: pointer;
    overflow: hidden;
    display: inline-block;
    width: 100%;
    font-weight: 700;
    font-size: 16px;
    color: var(--color-text);
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 4px;
`

export const Content = styled.div`
    display: -webkit-box;
    overflow: hidden;
    word-break: keep-all;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: 100%;
    font-size: 13px;
    color: var(--color-text-muted);
`

export const MapBtnBox = styled.button`
    border: none;
    outline: none;
    border-radius: 999px;
    cursor: pointer;
    flex-shrink: 0;
    background: ${(props) => (props.open ? "url(/assets/image35_1.png) " : "url(/assets/image35.png) ") + "no-repeat scroll 0 0 transparent"};
    background-size: contain;
    width: 32px;
    height: 32px;
`

export const MapBox = styled.div`
    position: sticky;
    top: 100px;
    width: 420px;
    max-width: 100%;
    height: 520px;
    flex-shrink: 0;
    border-radius: var(--radius-md);
    overflow: hidden;
    box-shadow: var(--shadow-card);
    z-index: 0;

    @media (max-width: 900px) {
        position: static;
        width: 100%;
        height: 360px;
    }
`

export const Comment = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    margin-top: 60px;
`
export const CommentBox = styled.div`
    background-color: var(--color-bg);
    width: 100%;
    border-radius: var(--radius-lg);
    box-sizing: border-box;
    padding: 24px;
`

export const ReviewBox = styled.div`
    width: 100%;
    display: flex;
    padding: 16px 0;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-border);
    }
`

export const RefirstBox = styled.div`
    margin-left: 12px;
    flex: 1;
    min-width: 0;
`

export const ReImage = styled.img`
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: var(--shadow-card);
`

export const ReName = styled.div`
    font-weight: 700;
    font-size: 14px;
    color: var(--color-text);
`

export const ReContent = styled.div`
    margin-top: 4px;
    font-size: 14px;
    color: var(--color-text);
`

export const ReDate = styled.div`
    margin-top: 2px;
    font-size: 12px;
    color: var(--color-text-muted);
`

export const InputBox = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    padding-top: 40px;
`

export const ReviewTextBox = styled.div`
    position: absolute;
    top: 0;
    left: 0;
`

export const ReviewText = styled.div`
    font-weight: 700;
    font-size: 14px;
    color: var(--color-text);
`

export const InputComment = styled.textarea`
    resize: none;
    width: 100%;
    min-height: 90px;
    box-sizing: border-box;
    padding: 14px;
    font-size: 14px;
    font-family: inherit;
    color: var(--color-text);
    background-color: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    outline: none;
    transition: var(--transition-base);

    &:focus {
        border-color: var(--color-primary);
    }
`

export const InputBtn = styled.button`
    align-self: flex-end;
    margin-top: 10px;
    border: none;
    color: white;
    border-radius: 999px;
    display: flex;
    width: 90px;
    height: 38px;
    background-color: var(--color-primary);
    transition: var(--transition-base);
    cursor: pointer;
    font-weight: 700;
    font-size: 14px;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: var(--color-primary-dark);
    }
`
