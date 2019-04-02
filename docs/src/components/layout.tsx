import * as React from 'react';
import Helmet from 'react-helmet';
import { RouterProps } from '@reach/router';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import Header from './header';
import { MDXProvider } from '@mdx-js/tag';
import { LayoutQueryData } from '../interfaces/LayoutQuery.interface';
import { Grid, MuiThemeProvider } from '@material-ui/core';
import { muiTheme } from '../config/theme';
import mdxComponents from './mdxcomponents/MDXComponents';

const MainLayout = styled.main`
  margin: 1rem auto;
  max-width: 100%;
`;

type LayoutProps = React.ReactNode & RouterProps;

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
            keywords
          }
        }
      }
    `}
    render={({ site }: LayoutQueryData) => {
      const { title, description, keywords } = site.siteMetadata;

      return (
        <MuiThemeProvider theme={muiTheme}>
          <>
            <Helmet
              title={title}
              meta={[
                { name: 'description', content: description },
                { name: 'keywords', content: keywords || 'keywords' },
              ]}
            >
              <html lang="en" />
            </Helmet>
            <Header siteTitle={title} />
            <Grid
              container
              justify="center"
              direction="row"
              style={{ marginTop: '70px' }}
            >
              <Grid
                item
                style={{
                  width: '860px',
                  maxWidth: '100%',
                  padding: '0 1.2rem',
                }}
              >
                <MainLayout>
                  <MDXProvider components={mdxComponents}>
                    {children}
                  </MDXProvider>
                </MainLayout>
              </Grid>
            </Grid>
          </>
        </MuiThemeProvider>
      );
    }}
  />
);

export default Layout;
