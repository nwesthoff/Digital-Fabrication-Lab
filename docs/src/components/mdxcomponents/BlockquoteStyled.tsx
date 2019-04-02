import { muiTheme } from '../../config/theme';
import styled from 'styled-components';

const BlockquoteStyled = styled.blockquote`
  border-left: 5px solid ${muiTheme.palette.primary.dark};
  margin-left: 2rem;
  padding-left: 2rem;
  color: ${muiTheme.palette.text.secondary};
  font-size: 16px;
  line-height: 28px;
  font-style: italic;

  p {
    font-size: 16px;
    line-height: 28px;
    font-style: italic;
    color: ${muiTheme.palette.text.secondary};
  }
`;

export default BlockquoteStyled;
