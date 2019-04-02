import * as React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Typography,
  IconButton,
  ListItemIcon,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import GravatarImg from './GravatarImg';
import fetchGravatar from '../api/fetchGravatar';

const Sidebar = () => (
  <StaticQuery
    query={graphql`
      query sidebarQuery {
        allMdx(sort: { fields: [frontmatter___date], order: ASC }) {
          edges {
            node {
              id
              frontmatter {
                title
                subtitle
                path
              }
            }
          }
        }
      }
    `}
    render={data => {
      const posts = data.allMdx.edges.map(edge => edge.node);

      return (
        <div>
          {posts && posts.length > 0 ? (
            <List style={{ paddingTop: '0' }}>
              <ListItem style={{ padding: '24px 16px' }}>
                <ListItemText
                  primary={
                    <Typography variant="h6" component="h2">
                      Digital Fabrication Lab
                    </Typography>
                  }
                  secondary={
                    <span>
                      by{' '}
                      <a href="https://nilswesthoff.com" target="blank">
                        Nils Westhoff
                      </a>
                      , Avelien Husen <br /> and Annemar Marinissen
                    </span>
                  }
                />
              </ListItem>
              <Divider />
              <Link to={`/`} style={{ textDecoration: 'none', color: 'white' }}>
                <ListItem button>
                  <ListItemText primary="Home" secondary="go home" />
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                </ListItem>
              </Link>
              <Divider />
              {posts.map(post => {
                const currentPage = () => {
                  const currentPath = location.pathname;
                  const linkPath = `/posts${post.frontmatter.path}`;

                  if (currentPath === linkPath) {
                    return true;
                  }
                  return false;
                };

                return (
                  <Link
                    to={`/posts${post.frontmatter.path}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <ListItem button key={post.id} selected={currentPage()}>
                      <ListItemText
                        primary={post.frontmatter.title}
                        secondary={
                          <div style={{ maxWidth: '18rem' }}>
                            {post.frontmatter.subtitle}
                          </div>
                        }
                      />
                    </ListItem>
                  </Link>
                );
              })}
            </List>
          ) : null}
        </div>
      );
    }}
  />
);

export default Sidebar;
