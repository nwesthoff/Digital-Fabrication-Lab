import * as React from 'react';
import { Language } from 'prism-react-renderer';
import { Button } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import styled from 'styled-components';
interface Props {
  defaultProps: any;
  className: Language;
}

interface State {
  open: boolean;
  height: number;
}

const StyledPre = styled.pre`
  border-radius: 8px;
  padding: 16px;
  background: #000;
  overflow-y: hidden;
`;

export default class PreStyled extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      open: false,
      height: 0,
    };
  }

  handleOpenClick = () => {
    this.setState({
      open: !this.state.open,
    });
  }

  componentDidMount() {
    const height = this.divElement.clientHeight;
    this.setState({ height });
  }

  render() {
    return (
      <div ref={divElement => (this.divElement = divElement)}>
        <StyledPre
          language={this.props.className}
          style={{
            maxHeight: this.state.open ? 'none' : '12rem',
            overflowX: this.state.open ? 'scroll' : 'hidden',
          }}
        >
          {this.props.children}
        </StyledPre>
        {this.state.height ? (
          <Button
            color="secondary"
            onClick={() => {
              this.handleOpenClick();
            }}
            style={{ marginBottom: '1.2rem' }}
          >
            Show {!this.state.open ? 'More' : 'Less'}{' '}
            <KeyboardArrowDownIcon
              style={{ rotate: this.state.open ? '180deg' : '0deg' }}
            />
          </Button>
        ) : null}
      </div>
    );
  }
}
