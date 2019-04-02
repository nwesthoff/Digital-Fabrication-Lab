import * as React from 'react';
import { preToCodeBlock } from 'mdx-utils';
import Code from './Code';
import { Typography } from '@material-ui/core';
import LinkStyled from './LinkStyled';
import BlockquoteStyled from './BlockquoteStyled';

// Defining the `MDXProvider` components prop value
const mdxComponents = {
  h1: (props: any) => (
    <Typography variant="h1" style={{ margin: '1.2rem 0' }} {...props} />
  ),
  h2: (props: any) => (
    <Typography variant="h2" style={{ margin: '1.2rem 0' }} {...props} />
  ),
  h3: (props: any) => (
    <Typography variant="h3" style={{ margin: '1.0rem 0' }} {...props} />
  ),
  h4: (props: any) => (
    <Typography variant="h4" style={{ margin: '.8rem 0' }} {...props} />
  ),
  h5: (props: any) => (
    <Typography
      variant="h5"
      color="primary"
      style={{ margin: '.6rem 0' }}
      {...props}
    />
  ),
  h6: (props: any) => (
    <Typography
      variant="h6"
      color="primary"
      style={{ margin: '.4rem 0' }}
      {...props}
    />
  ),
  p: (props: any) => (
    <Typography
      variant="body1"
      style={{ margin: '0' }}
      {...props}
      gutterBottom
    />
  ),
  pre: (props: any) => {
    const preProps = preToCodeBlock(props);
    if (preProps) {
      return <Code {...preProps} />;
    } else {
      return <pre {...props} />;
    }
  },
  ul: (props: any) => <ul style={{ margin: '0 0 1.2rem' }} {...props} />,
  ol: (props: any) => <ol style={{ margin: '0 0 1.2rem' }} {...props} />,
  li: (props: any) => (
    <li>
      <Typography variant="body1" {...props} />
    </li>
  ),
  a: (props: any) => <LinkStyled target="blank" {...props} />,
  blockquote: (props: any) => <BlockquoteStyled {...props} />,
};

export default mdxComponents;
