import * as React from 'react';
import { RouterProps } from '@reach/router';

import Layout from '../components/layout';
import ChapterList from '../components/ChapterList';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
} from '@material-ui/core';

const IndexPage: React.SFC<RouterProps> = ({ location }) => (
  <Layout location={location}>
    <Grid container spacing={32}>
      <Grid item>
        <Typography variant="h1" gutterBottom>
          Software Report
        </Typography>
        <Typography variant="h2" gutterBottom>
          Digital Fabrication App
        </Typography>
        <Typography variant="body1" gutterBottom>
          Coach: Adrie Kooiman
        </Typography>
        <Typography variant="body1" gutterBottom>
          A report by Group 8: <br />
          - Avelien Husen (4432436)
          <br />
          - Annemar Marinissen (4429842)
          <br />
          - Nils Westhoff (4364678)
          <br />
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <hr />
      </Grid>

      <Grid item>
        <Typography variant="h3" style={{ marginBottom: '2rem' }}>
          Table of Contents
        </Typography>
        <ChapterList />
      </Grid>
    </Grid>
  </Layout>
);

export default IndexPage;
