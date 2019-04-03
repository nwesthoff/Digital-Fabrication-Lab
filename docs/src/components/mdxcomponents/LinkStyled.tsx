import { muiTheme } from '../../config/theme';
import styled from 'styled-components';

const LinkStyled = styled.a`
  color: ${muiTheme.palette.text.primary};
  text-decoration: none;
  -webkit-text-decoration-skip: objects;
  position: relative;

  &:before,
  &:after {
    content: "";
    opacity: 0.5;
    z-index: -1;
    position: absolute;
    height: 3px;
    bottom: 0px;
    transition: 250ms ease-in-out;
  }

  &:before {
    left: -5px;
    width: 100%;
    background-color: ${muiTheme.palette.primary.light};
  }

  &:after {
    right: -5px;
    width: 0%;
    background-color: ${muiTheme.palette.secondary.dark};
  }

  &:hover,
  &:focus {
    &:before,
    &:after {
      transition: 150ms ease-in-out;
    }

    &:before {
      width: 0;
    }

    &:after {
      width: 100%;
    }
  }

  &:active,
  &:hover {
    outline-width: 0;
  }
`;

export default LinkStyled;
