import styled from "styled-components";

export const Wrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 150px 20px 100px;

    @media (max-width: 768px) {
        padding: 100px 20px 60px;
    }
`

export const Title = styled.h1`
    font-size: 28px;
    font-weight: 800;
    color: var(--color-text);
    margin-bottom: 8px;
`

export const UpdatedAt = styled.div`
    font-size: 13px;
    color: var(--color-text-muted);
    margin-bottom: 40px;
`

export const Section = styled.section`
    margin-bottom: 32px;
`

export const SectionTitle = styled.h2`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    font-weight: 800;
    color: var(--color-text);
    margin-bottom: 14px;

    &::before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 18px;
        border-radius: 999px;
        background-color: var(--color-primary);
    }
`

export const Paragraph = styled.p`
    font-size: 15px;
    line-height: 1.7;
    color: var(--color-text);
    margin-bottom: 10px;
`

export const List = styled.ul`
    margin: 0 0 10px;
    padding-left: 20px;
`

export const ListItem = styled.li`
    font-size: 15px;
    line-height: 1.7;
    color: var(--color-text);
`

export const Notice = styled.div`
    padding: 16px 18px;
    background-color: var(--color-bg);
    border-radius: var(--radius-md);
    font-size: 13px;
    color: var(--color-text-muted);
    line-height: 1.6;
    margin-bottom: 32px;
`
