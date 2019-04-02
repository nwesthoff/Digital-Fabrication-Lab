import * as React from 'react';
import { preToCodeBlock } from 'mdx-utils';
import Code from './Code';
import { Typography, Link } from '@material-ui/core';

// Defining the `MDXProvider` components prop value
const mdxComponents = {
  h1: (props: any) => <Typography variant="h1" {...props} />,
  h2: (props: any) => <Typography variant="h2" {...props} />,
  h3: (props: any) => <Typography variant="h3" {...props} />,
  h4: (props: any) => <Typography variant="h4" {...props} />,
  h5: (props: any) => <Typography variant="h5" {...props} />,
  h6: (props: any) => <Typography variant="h6" {...props} />,
  p: (props: any) => <Typography variant="body1" {...props} />,
  pre: (props: any) => {
    const preProps = preToCodeBlock(props);
    if (preProps) {
      return <Code {...preProps} />;
    } else {
      return <pre {...props} />;
    }
  },
  ul: (props: any) => <ul {...props} />,
  ol: (props: any) => <ol {...props} />,
  li: (props: any) => (
    <li>
      <Typography variant="body1" {...props} />
    </li>
  ),
  a: (props: any) => <Link {...props} />,
};

export default mdxComponents;
