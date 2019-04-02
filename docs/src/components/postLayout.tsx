import * as React from 'react';
import { RouterProps } from '@reach/router';
import Layout from './layout';
import { PostQueryData } from '../interfaces/PostQuery.interface';
import NextPostLink from './NextPostLink';

type PostLayoutProps = PostQueryData & RouterProps;

const PostLayout: React.FunctionComponent<PostLayoutProps> = props => {
  if (props && props.pageContext) {
    const { location, pageContext } = props;

    return (
      <Layout location={location}>
        <h1>{pageContext.frontmatter.title}</h1>
        <h2>{pageContext.frontmatter.subtitle}</h2>
        {/* <h3>{pageContext.node.timeToRead} min read</h3> */}
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
