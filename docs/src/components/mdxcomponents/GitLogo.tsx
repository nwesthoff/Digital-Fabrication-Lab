import * as React from 'react';
import { Button } from '@material-ui/core';
import OctoCat from '../../images/octocat.svg';

interface Props {
  src: String;
}

export default class GitLogo extends React.Component<Props> {
  render() {
    return (
      <Button href={this.props.src} target="blank">
        <img
          style={{ height: 24, width: 24, marginRight: '.4rem' }}
          src={OctoCat}
        />
        View Source
      </Button>
    );
  }
}
