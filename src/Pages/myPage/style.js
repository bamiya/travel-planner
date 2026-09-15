import styled from "styled-components";
import { NavLink as Link } from 'react-router-dom';

export const Box = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto 40px;
    box-sizing: border-box;
    padding: 0 20px;
`

export const ProfileCard = styled.div`
    width: 100%;
    background-color: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-card);
    box-sizing: border-box;
    padding: 48px 32px 36px;
    margin-top: 150px;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
        margin-top: 110px;
        padding: 36px 20px 28px;
    }
`

export const AvatarWrap = styled.div`
    position: relative;
    width: 116px;
    height: 116px;
    margin-bottom: 18px;
`

export const Profile = styled.img`
    width: 116px;
    height: 116px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: var(--shadow-card);
    border: 3px solid var(--color-white);
    box-sizing: border-box;
`

export const SettingsBtn = styled.div`
    position: absolute;
    right: -2px;
    bottom: -2px;
    width: 34px;
    height: 34px;
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
        width: 16px;
        height: 16px;
    }
`

export const Name = styled.div`
    font-size: 22px;
    font-weight: 800;
    color: var(--color-text);
`

export const TabRow = styled.nav`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 6px;
    padding: 6px;
    background-color: var(--color-bg);
    border-radius: 999px;
    width: fit-content;
    max-width: 100%;
    margin: 0 auto;
`

export const Tab = styled(Link)`
    padding: 10px 22px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    transition: var(--transition-base);
    color: ${props => (props.$active ? "white" : "var(--color-text-muted)")};
    background: ${props => (props.$active ? "var(--color-primary)" : "transparent")};

    &:hover {
        background: ${props => (props.$active ? "var(--color-primary-dark)" : "var(--color-primary-light)")};
        color: ${props => (props.$active ? "white" : "var(--color-primary-dark)")};
    }

    @media (max-width: 480px) {
        padding: 9px 16px;
        font-size: 13px;
    }
`
