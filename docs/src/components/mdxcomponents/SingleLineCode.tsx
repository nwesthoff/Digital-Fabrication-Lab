import * as React from 'react';
import styled from 'styled-components';

const CodeStyled = styled.code`
  background: none;
  display: inline-block;
  font-size: 1em;
`;

export default class Code extends React.Component {
  render() {
    return <CodeStyled>{this.props.children}</CodeStyled>;
  }
}
