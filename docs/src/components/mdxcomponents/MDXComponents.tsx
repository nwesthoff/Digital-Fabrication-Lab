import * as React from 'react';
import { preToCodeBlock } from 'mdx-utils';
import Code from './Code';
import { Typography } from '@material-ui/core';
import LinkStyled from './LinkStyled';
import BlockquoteStyled from './BlockquoteStyled';
import PreStyled from './PreStyled';

// Defining the `MDXProvider` components prop value
const mdxComponents = {
  h1: (props: any) => <Typography variant="h2" {...props} />,
  h2: (props: any) => <Typography variant="h3" color="primary" {...props} />,
  h3: (props: any) => <Typography variant="h4" {...props} />,
  h4: (props: any) => <Typography variant="h5" color="primary" {...props} />,
  p: (props: any) => (
    <Typography
      variant="body1"
      style={{ marginBottom: '.8rem' }}
      {...props}
      gutterBottom
    />
  ),
  code: (props: any) => <code {...props} />,
  pre: (props: any) => {
    let preProps;
    if (!props.className) {
      preProps = preToCodeBlock(props);
    }

    if (preProps) {
      return <Code {...preProps} />;
    } else {
      return <PreStyled {...props} />;
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
  img: (props: any) => (
    <img
      style={{ maxWidth: '100%', height: 'auto', margin: '2rem 0' }}
      {...props}
    />
  ),
};

export default mdxComponents;
