import React, { Component } from 'react';
import { Avatar } from '@material-ui/core';
import styled from 'styled-components';

interface Props {
  src?: string;
}

const Gravatar = styled.div`
  border-radius: 100%;
  border: solid 2px #ef5350;
  padding: 3px;
  background-clip: content-box; /* support: IE9+ */
`;

export default class GravatarImg extends Component<Props> {
  render() {
    return this.props.src ? (
      <Gravatar>
        <Avatar alt="Gravatar Profile Image" src={this.props.src} />
      </Gravatar>
    ) : null;
  }
}
