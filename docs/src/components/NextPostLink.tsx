import React, { Component } from 'react';
import { Link } from '@reach/router';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { muiTheme } from '../config/theme';

interface Props {
  path: string;
  title: string;
  subtitle?: string;
}

const NextPostLinkContainer = styled(Link)`
  display: block;
  background: ${muiTheme.palette.primary.light};
  padding: 2rem 3rem;
  color: white;
  text-decoration: none;

  &:hover {
    /* text-decoration: underline; */
    color: white;
    background: ${muiTheme.palette.primary.main};
  }
`;

export default class NextPostLink extends Component<Props> {
  render() {
    return (
      <div style={{ marginTop: '2rem' }}>
        <NextPostLinkContainer to={this.props.path}>
          <Typography
            variant="overline"
            color="inherit"
            style={{ opacity: 0.8, fontSize: '1em' }}
          >
            Next Project:
          </Typography>
          <Typography variant="h2" component="h4" color="inherit">
            {this.props.title}
          </Typography>
          <Typography
            variant="h3"
            component="h6"
            color="inherit"
            style={{ opacity: 0.9 }}
          >
            {this.props.subtitle}
          </Typography>
        </NextPostLinkContainer>
      </div>
    );
  }
}
