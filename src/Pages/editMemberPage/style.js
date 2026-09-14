import styled from "styled-components";


export const EditTitle = styled.div`
    font-size: 28px;
    margin: 150px 150px 20px;
    font-weight: 800;
    color: var(--color-text);

    @media (max-width: 768px) {
        margin: 60px 20px 20px;
        font-size: 22px;
    }
`
export const TitleBar = styled.div`
    width: 170px;
    height: 1px;
    margin-left: 60px;
    margin-top: 15px;
    background-color: var(--color-border);

    @media (max-width: 768px) {
        margin-left: auto;
        margin-right: auto;
    }
`
export const ProfileBox = styled.div`
    display: flex;
    table-layout: fixed;
    width: 800px;
    max-width: 100%;
    margin: 0 150px 200px ;

    @media (max-width: 768px) {
        flex-direction: column;
        width: 100%;
        margin: 0 0 60px;
    }
`
export const LeftProfileBox = styled.div`
    width: 300px;
    background-color: var(--color-primary-light);
    border-radius: var(--radius-md) 0 0 var(--radius-md);

    @media (max-width: 768px) {
        width: 100%;
        box-sizing: border-box;
        padding-bottom: 20px;
        border-radius: var(--radius-md) var(--radius-md) 0 0;
    }
`
export const LeftContent = styled.div`
    width: 120px;
    font-size: 16px;
    margin: 40px 90px 30px;
    text-align: center;
    cursor: pointer;
    color: ${props => props.click ? "var(--color-primary-dark)" : "var(--color-text-muted)"};
    border-bottom: ${props => {
        if(props.click) return "2px solid var(--color-primary)"
        else return "2px solid transparent"
    }};

    font-weight: ${props => {
        if(props.click) return "700"
        else return "500"
    }};
    transition: var(--transition-base);

    @media (max-width: 768px) {
        width: auto;
        margin: 20px auto;
    }
`
export const MemberInforBox = styled.div`
    height: 600px;
    margin-left: 100px;
    padding: 20px 17px 0;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-card);
    border: 1px solid var(--color-border);
    background-color: var(--color-white);
    box-sizing: border-box;

    @media (max-width: 768px) {
        height: auto;
        margin: 20px 0 0;
        padding-bottom: 30px;
    }
`
export const ProfileImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    box-shadow: var(--shadow-card);
    border: 3px solid var(--color-white);
    margin: 100px 100px 10px;

    @media (max-width: 768px) {
        display: block;
        margin: 40px auto 10px;
    }
`
export const MemberContentBox = styled.div`
    margin: 20px 0 0;
    padding: 30px 30px 0;
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
export const BasicInformation = styled.div`
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 700;
    color: var(--color-text);
    text-align:center;
`
export const BasicInformationBox = styled.div`
    height: 60px;
    display: flex;
    margin: 0 30px;
`
export const BasicInformationImg = styled.img`
    width: 56px;
    height: 56px;
    border-radius: 50px;
    margin-top: 15px;
    box-shadow: var(--shadow-card);
`
export const BasicInformationName =styled.div`
    font-size: 22px;
    font-weight: 700;
    color: var(--color-text);
`
export const BasicInformationEamil = styled.div`
    font-size: 14px;
    color: var(--color-text-muted);
`
export const BasicInformationEamilBox = styled.div`
    margin-top: 10px;
    margin-left: 10px;
`
export const Memberemail = styled.div`
    text-align:center;
    font-size: 14px;
    color: var(--color-text-muted);
`
export const MyProfileBox = styled.div`
    height: 600px;
    margin-left: 100px;
    padding: 20px 17px 0;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-card);
    border: 1px solid var(--color-border);
    background-color: var(--color-white);
    box-sizing: border-box;

    @media (max-width: 768px) {
        height: auto;
        margin: 20px 0 0;
        padding-bottom: 30px;
    }
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
    width: 100px;
    height: 40px;
    margin: 45px 150px;
    font-size: 15px;
    font-weight: 700;
    background: var(--color-primary);
    color: white;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: var(--transition-base);

    &:hover {
        background: var(--color-primary-dark);
    }

    @media (max-width: 768px) {
        margin: 30px auto;
        display: block;
    }
`
export const BasicInfoBtn = styled.button`
    border: 0;
    width: 100px;
    height: 40px;
    margin: 85px 150px ;
    font-size: 15px;
    font-weight: 700;
    background: var(--color-primary);
    color: white;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: var(--transition-base);

    &:hover {
        background: var(--color-primary-dark);
    }

    @media (max-width: 768px) {
        margin: 30px auto;
        display: block;
    }
`
export const DeleteBtn = styled.button`
    border: none;
    margin-top: 30px;
    margin-left: 200px;
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
    margin: 20px 0 0;
    padding: 20px 30px 0;
`
export const ProfileImgChange = styled.img`
    width: 15px;
    height: 15px;
    border-radius: 50px;
`
export const ProfileImgInput = styled.input`
    display: none ;
`
export const LabelBox = styled.label`
    display:inline-block;
    cursor: pointer;
    margin-top: 5px;
    margin-left: 70px;
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

//사진변경가능하게 해야함
