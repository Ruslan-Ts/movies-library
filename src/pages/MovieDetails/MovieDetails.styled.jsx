import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MovieContainer = styled.div`
  display: flex;
  gap: 50px;
  margin: 40px;
`;
export const StyledLink = styled(Link)`
  font-size: 1rem;
  margin: 40px;
  padding: 10px;
  background: #3f51b5;
  color: #ffffff;
  text-decoration: none;

  box-shadow: 0 0px 0px hsla(190deg, 15%, 5%, 0.2);
  transfrom: translateY(0);
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;

  transition: border-top-left-radius 0.15s 0.15s ease-out,
    border-top-right-radius 0.15s calc(0.15s * 2) ease-out,
    border-bottom-right-radius 0.15s calc(0.15s * 3) ease-out,
    border-bottom-left-radius 0.15s calc(0.15s * 4) ease-out,
    box-shadow calc(0.15s * 4) ease-out, transform calc(0.15s * 4) ease-out,
    background calc(0.15s * 4) steps(4, jump-end);

  &:hover,
  &:focus {
    box-shadow: 0 4px 8px hsla(190deg, 15%, 5%, 0.2);
    transform: translateY(-4px);
    background: hsl(230deg, 50%, 45%);
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }
`;
export const Image = styled.img`
  width: 360px;
  height: 100%;
  background-size: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: scale(1.1);
    cursor: zoom-in;
  }
`;
