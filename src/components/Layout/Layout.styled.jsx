import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavContainer = styled.nav`
  display: flex;
  gap: 30px;
  margin: 40px;
`;

export const StyledLink = styled(NavLink)`
  padding: 8px 16px;
  border-radius: 2px;
  background-color: #3f51b5;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  display: inline-block;
  color: #fff;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  line-height: 24px;
  font-style: normal;
  font-weight: 500;
  min-width: 180px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  &:hover,
  &:focus {
    background-color: #303f9f;
  }
`;

export const StylesSvg = styled.svg`
  grid-area: main;
  background-size: contain;
  height: 4200px;
  width: 100%;
  position: absolute;
  z-index: -50;
`;

export const PageBox = styled.div`
  min-height: 100vh;
  display: grid;
`;

export const Header = styled.header`
  margin: 0px;
  padding: 0px;
`;
