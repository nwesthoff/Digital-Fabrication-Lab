import * as React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';

interface Props {
  defaultProps: any;
  codeString: string;
  className: Language;
}

interface State {
  open: boolean;
}

export default class Code extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <div
        style={{
          maxHeight: this.state.open ? 'auto' : '10rem',
          overflow: 'hidden',
        }}
      >
        <Highlight
          {...defaultProps}
          code={this.props.codeString}
          language={this.props.className}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={{ ...style, padding: '20px' }}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    );
  }
}
