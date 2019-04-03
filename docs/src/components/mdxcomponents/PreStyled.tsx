import * as React from 'react';
import { Language } from 'prism-react-renderer';
import { Button } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

interface Props {
  defaultProps: any;
  className: Language;
}

interface State {
  open: boolean;
}

export default class PreStyled extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleOpenClick = () => {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    return (
      <div>
        <pre
          language={this.props.className}
          style={{
            maxHeight: this.state.open ? 'none' : '12rem',
            borderRadius: '8px',
            padding: '16px',
            background: '#000',
            overflowY: 'hidden',
            overflowX: this.state.open ? 'scroll' : 'hidden',
          }}
        >
          {this.props.children}
        </pre>
        <Button
          color="secondary"
          onClick={() => {
            this.handleOpenClick();
          }}
        >
          Show {!this.state.open ? 'More' : 'Less'}{' '}
          <KeyboardArrowDownIcon
            style={{ rotate: this.state.open ? '180deg' : '0deg' }}
          />
        </Button>
      </div>
    );
  }
}
