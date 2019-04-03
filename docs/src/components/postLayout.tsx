import * as React from 'react';
import { RouterProps } from '@reach/router';
import Layout from './layout';
import { PostQueryData } from '../interfaces/PostQuery.interface';
import NextPostLink from './NextPostLink';
import { Typography } from '@material-ui/core';

type PostLayoutProps = PostQueryData & RouterProps;

const PostLayout: React.FunctionComponent<PostLayoutProps> = props => {
  if (props && props.pageContext) {
    const { location, pageContext } = props;

    return (
      <Layout location={location}>
        <Typography variant="h1">{pageContext.frontmatter.title}</Typography>
        <Typography variant="h2" color="primary">
          {pageContext.frontmatter.subtitle}
        </Typography>
        {props.children}
        {pageContext.next ? (
          <NextPostLink
            path={`/posts${pageContext.next.frontmatter.path}`}
            title={pageContext.next.frontmatter.title}
            subtitle={pageContext.next.frontmatter.subtitle}
          />
        ) : null}
      </Layout>
    );
  }

  return <div>No Post Data</div>;
};

export default PostLayout;
