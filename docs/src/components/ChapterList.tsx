import * as React from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';
import { PostsQueryData } from '../interfaces/PostsQuery.interface';
import { Typography, Grid } from '@material-ui/core';
import { muiTheme } from '../config/theme';

const Post = styled.article`
  border-left: 5px solid ${muiTheme.palette.primary.dark};
  padding-left: 2.4rem;
  margin-bottom: 2.4rem;
  line-height: 1.75rem;
  transition: all 250ms ease-out;

  &:hover {
    transform: translate(2rem, 0);
    border-left: 5px solid ${muiTheme.palette.primary.main};
  }

  @media (max-width: 480px) {
    font-size: 90%;
    margin-bottom: 1.4rem;

    p {
      margin-bottom: 0.4rem;
    }
  }
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
              <Grid
                container
                direction="column"
                spacing={8}
                style={{ width: '100%' }}
              >
                <Grid item>
                  <Typography variant="h3" component="h3">
                    {title}
                  </Typography>
                  <Typography variant="h4" component="h4">
                    {node.frontmatter.subtitle}
                  </Typography>
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
            subtitle
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
