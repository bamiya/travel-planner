import styled from "styled-components";

export const Wrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 150px 20px 100px;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 100px 20px 60px;
    }
`

export const Title = styled.h1`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 28px;
    font-weight: 800;
    color: var(--color-text);
    margin-bottom: 32px;

    &::before {
        content: "";
        display: inline-block;
        width: 5px;
        height: 26px;
        border-radius: 999px;
        background-color: var(--color-primary);
    }
`

export const TitleRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
`

export const AdminRow = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid var(--color-border);
`

export const AdminBtn = styled.button.attrs({ type: "button" })`
    border: none;
    outline: none;
    font-family: inherit;
    padding: 10px 18px;
    font-size: 13px;
    font-weight: 700;
    border-radius: 999px;
    cursor: pointer;
    transition: var(--transition-base);
    background-color: ${(props) => (props.danger ? "transparent" : "var(--color-primary-light)")};
    color: ${(props) => (props.danger ? "var(--color-accent)" : "var(--color-primary-dark)")};
    flex-shrink: 0;

    &:hover {
        background-color: ${(props) => (props.danger ? "var(--color-accent)" : "var(--color-primary)")};
        color: var(--color-white);
    }
`

export const FormInput = styled.input`
    width: 100%;
    box-sizing: border-box;
    padding: 12px 14px;
    font-size: 16px;
    font-weight: 700;
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    outline: none;
    margin-bottom: 12px;
    transition: var(--transition-base);

    &:focus {
        border-color: var(--color-primary);
    }
`

export const FormTextarea = styled.textarea`
    width: 100%;
    min-height: 280px;
    box-sizing: border-box;
    padding: 12px 14px;
    font-size: 15px;
    font-family: inherit;
    line-height: 1.7;
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    outline: none;
    resize: vertical;
    margin-bottom: 20px;
    transition: var(--transition-base);

    &:focus {
        border-color: var(--color-primary);
    }
`

export const SubmitBtn = styled.button.attrs({ type: "button" })`
    border: none;
    outline: none;
    font-family: inherit;
    padding: 12px 28px;
    font-size: 14px;
    font-weight: 700;
    border-radius: 999px;
    cursor: pointer;
    background-color: var(--color-primary);
    color: white;
    transition: var(--transition-base);

    &:hover {
        background-color: var(--color-primary-dark);
    }
`

export const EmptyText = styled.div`
    padding: 60px 0;
    text-align: center;
    font-size: 15px;
    font-weight: 600;
    color: var(--color-text-muted);
`

export const NoticeList = styled.div`
    display: flex;
    flex-direction: column;
`

export const NoticeRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 18px 4px;
    cursor: pointer;
    border-bottom: 1px solid var(--color-border);
    transition: var(--transition-base);

    &:hover {
        background-color: var(--color-bg);
    }
`

export const NoticeTitle = styled.div`
    font-size: 15px;
    font-weight: 700;
    color: var(--color-text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const NoticeDate = styled.div`
    flex-shrink: 0;
    font-size: 13px;
    color: var(--color-text-muted);
`

export const BackBtn = styled.button.attrs({ type: "button" })`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    border: none;
    background: none;
    padding: 0;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 700;
    color: var(--color-text-muted);
    cursor: pointer;

    &:hover {
        color: var(--color-text);
    }
`

export const DetailTitle = styled.h1`
    font-size: 24px;
    font-weight: 800;
    color: var(--color-text);
    margin-bottom: 8px;
`

export const DetailDate = styled.div`
    font-size: 13px;
    color: var(--color-text-muted);
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--color-border);
`

export const DetailContent = styled.div`
    font-size: 15px;
    line-height: 1.8;
    color: var(--color-text);
    white-space: pre-wrap;
    word-break: break-word;
`
