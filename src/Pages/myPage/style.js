import styled from "styled-components";

import { NavLink as Link } from 'react-router-dom';



export const ProfileBox = styled.div`
    width: 1200px;
    text-align: center;
    margin: 150px 0 50px 0; 
`

export const SettingBox = styled.div`
    width: 400px;
    text-align:center;
    margin-left: 400px;
    margin-top: 50px;
    position:relative;
`

export const Box1 = styled.div`
    width: 100%;
    display: flex;
`
export const Box = styled.div`
    width: 1200px;
    padding-bottom: 30px;
    border-bottom: 1px solid var(--color-border);
`

export const Box2 = styled.div`
    width: auto;
    text-align: center;
    display: flex;
    justify-content : center;
`

export const Profile = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 100%;
    margin-left: 50px;
    box-shadow: var(--shadow-card);
    border: 3px solid var(--color-white);
    box-sizing: border-box;
    position:absolute;

`

export const MyProfileBox = styled.div`
    width: 150px;
    height: 150px;
    margin-bottom: 20px;
`
export const SettingsImg= styled.img`
    width: 40px;
    height: 40px;
    margin-top: 130px;
    margin-left: 165px;
    position:absolute;
    cursor: pointer;
`

export const Text = styled.div`
    width: auto;
    text-align: center;
    font-size: 26px;
    font-weight: 800;
    color: var(--color-text);
    margin-right: 10px;
`

export const Text1 = styled.div`
    width: 100%;
    font-size: 15px;
    font-weight: 600;
    color: var(--color-text-muted);
    margin-top: 22.5px;


`

export const Nav = styled.nav`
  width: 980px;
  height: 70px;
  display: flex;
  
  margin-left: 120px; 
`;
  
export const NavLink = styled(Link)`
  color: ${props => props.isaction === "myPlan" ? "white" : "var(--color-text-muted)"};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  text-align: center;
  font-weight: 700;
  border-radius: var(--radius-sm);
  height: 100%;
  background: ${props => {
    return props.isaction === "myPlan" ? "var(--color-primary)" :"var(--color-bg)"
  }
  };
  cursor: pointer;
  transition: var(--transition-base);
  &:hover {
    background: ${props => props.isaction === "myPlan" ? "var(--color-primary-dark)" : "var(--color-primary-light)"};
    color: ${props => props.isaction === "myPlan" ? "white" : "var(--color-primary-dark)"};
  }
`;

export const NavLink1 = styled(Link)`
  color: ${props => props.isaction === "myComment" ? "white" : "var(--color-text-muted)"};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  text-align: center;
  font-weight: 700;
  border-radius: var(--radius-sm);
  height: 100%;
  background: ${props => {
    return props.isaction === "myComment" ? "var(--color-primary)" :"var(--color-bg)"
  }
  };
  cursor: pointer;
  transition: var(--transition-base);
  &:hover {
    background: ${props => props.isaction === "myComment" ? "var(--color-primary-dark)" : "var(--color-primary-light)"};
    color: ${props => props.isaction === "myComment" ? "white" : "var(--color-primary-dark)"};
  }
`;

export const NavLink2 = styled(Link)`
  color: ${props => props.isaction === "sharedPlan" ? "white" : "var(--color-text-muted)"};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  text-align: center;
  font-weight: 700;
  border-radius: var(--radius-sm);
  height: 100%;
  background: ${props => {
    return props.isaction === "sharedPlan" ? "var(--color-primary)" :"var(--color-bg)"
  }
  };
  cursor: pointer;
  transition: var(--transition-base);
  &:hover {
    background: ${props => props.isaction === "sharedPlan" ? "var(--color-primary-dark)" : "var(--color-primary-light)"};
    color: ${props => props.isaction === "sharedPlan" ? "white" : "var(--color-primary-dark)"};
  }
`;

export const NavLink3 = styled(Link)`
  color: ${props => props.isaction === "like" ? "white" : "var(--color-text-muted)"};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  text-align: center;
  font-weight: 700;
  border-radius: var(--radius-sm);
  height: 100%;
  background: ${props => {
    return props.isaction === "like" ? "var(--color-primary)" :"var(--color-bg)"
  }
  };
  cursor: pointer;
  transition: var(--transition-base);
  &:hover {
    background: ${props => props.isaction === "like" ? "var(--color-primary-dark)" : "var(--color-primary-light)"};
    color: ${props => props.isaction === "like" ? "white" : "var(--color-primary-dark)"};
  }
`;

export const NavMenu = styled.div`
  width: 300px;
  align-items: center;
  border-radius: var(--radius-sm);
  margin: 0 30px 0 0;
`;