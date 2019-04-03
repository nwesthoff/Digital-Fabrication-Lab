import * as React from 'react';
import styled from 'styled-components';

const IframeWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: ${props => {
    const ratio = props.ratio || 16 / 9;
    return 100 / ratio;
  }}%;
  overflow: hidden;
`;

const IframeStyled = styled.iframe`
  border: none;
  width: 100%;
  height: 100%;
  position: absolute;
`;

interface Props {
  ratio?: number;
  src: string;
}

export default class IframeResponsive extends React.Component<Props> {
  render() {
    return (
      <IframeWrapper ratio={this.props.ratio}>
        <IframeStyled src={this.props.src} />
      </IframeWrapper>
    );
  }
}
