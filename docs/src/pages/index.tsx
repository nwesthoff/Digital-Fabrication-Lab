import * as React from 'react';
import { RouterProps } from '@reach/router';

import Layout from '../components/layout';
import ChapterList from '../components/ChapterList';
import { Typography, Grid } from '@material-ui/core';

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
        <ul>
          <li>
            <Typography variant="body1">Avelien Husen (4432436)</Typography>
          </li>
          <li>
            <Typography variant="body1">
              Annemar Marinissen (4429842)
            </Typography>
          </li>
          <li>
            <Typography variant="body1">Nils Westhoff (4364678)</Typography>
          </li>
        </ul>
        <Typography variant="overline">Group 8</Typography>
        <Typography variant="overline" gutterBottom>
          Coach: Adrie Kooiman
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
