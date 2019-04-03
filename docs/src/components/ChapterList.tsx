import * as React from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';
import { PostsQueryData } from '../interfaces/PostsQuery.interface';
import { Typography, Button, Grid } from '@material-ui/core';
import NotesIcon from '@material-ui/icons/Notes';

const Post = styled.article`
  margin-bottom: 2.4rem;
  line-height: 1.75rem;

  @media (max-width: 480px) {
    font-size: 90%;
    margin-bottom: 1.4rem;

    p {
      margin-bottom: 0.4rem;
    }
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const WrapLink = styled(Link)`
  text-decoration: none;
`;

const ChapterList = () => (
  <StaticQuery
    query={LISTING_QUERY}
    render={({ allMdx }: PostsQueryData) =>
      allMdx.edges!.map(({ node }) => {
        const { path, title } = node.frontmatter;

        return (
          <WrapLink key={path} to={`/posts${path}`}>
            <Post>
              <Grid container direction="column" spacing={8}>
                {node.frontmatter.image ? (
                  <Grid item>
                    <PostImage
                      src={node.frontmatter.image.childImageSharp.fluid.src}
                      srcSet={
                        node.frontmatter.image.childImageSharp.fluid.srcSet
                      }
                    />
                  </Grid>
                ) : null}

                <Grid item>
                  <Typography variant="h4" component="h3">
                    {title}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography variant="body1">{node.excerpt}</Typography>
                </Grid>

                <Grid item>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Button variant="text" color="primary" size="large">
                        <NotesIcon style={{ marginRight: '.4rem' }} />
                        Read Chapter
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Post>
          </WrapLink>
        );
      })
    }
  />
);

const LISTING_QUERY = graphql`
  query LISTING_QUERY {
    allMdx(limit: 10, sort: { fields: [frontmatter___date], order: ASC }) {
      edges {
        node {
          excerpt
          frontmatter {
            path
            title
            date(formatString: "MMMM DD, YYYY")
            image {
              childImageSharp {
                fluid {
                  src
                  srcSet
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default ChapterList;