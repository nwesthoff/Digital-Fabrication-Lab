import React, { Component } from "react";
import { Avatar } from "@material-ui/core";
import styled from "styled-components";
import fetchGravatar from "api/fetchGravatar";
import materialTheme from "config/theme";

interface Props {
  email?: string;
}

const Gravatar = styled.div`
  border-radius: 100%;
  border: solid 2px ${materialTheme.palette.primary.main};
  padding: 3px;
  background-clip: content-box; /* support: IE9+ */
`;

export default class GravatarImg extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      src: undefined
    };
  }

  componentDidMount() {
    if (this.props.email) {
      const src = fetchGravatar(this.props.email);
      this.setState({
        src: src
      });
    }
  }

  render() {
    return this.state.src ? (
      <Gravatar>
        <Avatar alt="Gravatar Profile Image" src={this.state.src} />
      </Gravatar>
    ) : null;
  }
}
