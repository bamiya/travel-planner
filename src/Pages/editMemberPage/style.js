import styled from "styled-components";


export const HeroBanner = styled.div`
    margin: 90px 150px 32px;
    padding: 36px 40px;
    border-radius: var(--radius-lg);
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
    color: var(--color-white);
    box-shadow: var(--shadow-hover);

    @media (max-width: 768px) {
        margin: 70px 16px 24px;
        padding: 28px 24px;
    }
`
export const HeroTitle = styled.div`
    font-size: 26px;
    font-weight: 800;

    @media (max-width: 480px) {
        font-size: 22px;
    }
`
export const HeroSubtitle = styled.div`
    margin-top: 6px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.85);
`
export const TitleBar = styled.div`
    width: 170px;
    height: 1px;
    margin-top: 20px;
    background-color: var(--color-border);
`
export const ProfileBox = styled.div`
    display: flex;
    align-items: flex-start;
    table-layout: fixed;
    width: 800px;
    max-width: 100%;
    margin: 0 150px 200px ;
    gap: 24px;

    @media (max-width: 768px) {
        flex-direction: column;
        width: 100%;
        margin: 0 0 60px;
        padding: 0 16px;
        box-sizing: border-box;
    }
`
export const LeftProfileBox = styled.div`
    width: 260px;
    flex-shrink: 0;
    box-sizing: border-box;
    padding: 44px 20px 28px;
    background: linear-gradient(180deg, var(--color-primary-light) 0%, var(--color-white) 100%);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-card);
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
        width: 100%;
    }
`
export const AvatarWrap = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    margin-bottom: 16px;
`
export const PhotoEditLabel = styled.label`
    position: absolute;
    right: -2px;
    bottom: -2px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: var(--color-primary);
    color: white;
    box-shadow: var(--shadow-hover);
    cursor: pointer;
    transition: var(--transition-base);

    &:hover {
        background-color: var(--color-primary-dark);
    }

    svg {
        width: 14px;
        height: 14px;
    }
`
export const MyProfileBox = styled.div`
    flex: 1;
    min-width: 0;
    padding: 32px 36px 36px;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-hover);
    border: 1px solid var(--color-border);
    background-color: var(--color-white);
    box-sizing: border-box;

    @media (max-width: 768px) {
        margin: 20px 0 0;
        padding: 28px 20px 30px;
    }
`
export const SectionTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 24px;
    font-size: 18px;
    font-weight: 800;
    color: var(--color-text);

    &::before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 18px;
        border-radius: 999px;
        background-color: var(--color-primary);
    }
`
export const SectionDivider = styled.div`
    height: 1px;
    margin: 8px 0 32px;
    background-color: var(--color-border);
`
export const ProfileImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: var(--shadow-card);
    border: 3px solid var(--color-white);
    box-sizing: border-box;
`
export const MemberContentBox = styled.div`
    margin-top: 20px;
`
export const MemberEdit = styled.div`
    width: 150px;
    margin-right: 100px;
    margin-bottom: 10px;
    font-size: 15px;
    font-weight: 700;
    color: var(--color-text);
`
export const MemberName = styled.div`
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 700;
    color: var(--color-text);
    text-align:center;
`
export const Memberemail = styled.div`
    text-align:center;
    font-size: 14px;
    color: var(--color-text-muted);
`
export const Content = styled.input`
    margin: 0;
    border: 1px solid var(--color-border);
    outline: none;
    font-size: 15px;
    font-weight: 450;
    display: block;
    width: 350px;
    max-width: 100%;
    height: 44px;
    border-radius: var(--radius-sm);
    box-sizing: border-box;
    padding: 0 0 0 12px;
    background-color: var(--color-bg);
    margin-top: 7px;
    transition: var(--transition-base);

    &:focus {
        border-color: var(--color-primary);
        background-color: var(--color-white);
    }
`
export const EditBtn = styled.button`
    border: 0;
    width: 120px;
    height: 42px;
    margin: 28px 0 0;
    font-size: 15px;
    font-weight: 700;
    background: var(--color-primary);
    color: white;
    border-radius: 999px;
    cursor: pointer;
    transition: var(--transition-base);

    &:hover {
        background: var(--color-primary-dark);
    }

    @media (max-width: 768px) {
        margin: 28px auto 0;
        display: block;
    }
`
export const BasicInfoBtn = styled.button`
    border: 0;
    width: 120px;
    height: 42px;
    margin: 28px 0 0;
    font-size: 15px;
    font-weight: 700;
    background: var(--color-primary);
    color: white;
    border-radius: 999px;
    cursor: pointer;
    transition: var(--transition-base);

    &:hover {
        background: var(--color-primary-dark);
    }

    @media (max-width: 768px) {
        margin: 28px auto 0;
        display: block;
    }
`
export const DeleteBtn = styled.button`
    border: none;
    margin-top: 20px;
    background-color:transparent;
    color: var(--color-text-muted);
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
    transition: var(--transition-base);

    &:hover {
        color: var(--color-accent);
    }

    @media (max-width: 768px) {
        margin-left: auto;
        margin-right: auto;
        display: block;
    }
`
export const BtnBox = styled.div`
    width: 100%;
`
export const BasicInforContentBox = styled.div`
    margin-top: 20px;
`
export const ProfileImgInput = styled.input`
    display: none ;
`

export const ErrorMessage = styled.label`
    font-size: 14px;
    font-weight: 400;
    color: var(--color-accent);
`

export const WarningMessage = styled.span`
    font-weight: 600;
    color: ${props => {
        return props.check ? "var(--color-success)" : "var(--color-accent)"
    }}
`
