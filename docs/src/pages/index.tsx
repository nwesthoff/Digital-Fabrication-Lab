import * as React from 'react';
import { RouterProps } from '@reach/router';

import Layout from '../components/layout';
import ChapterList from '../components/ChapterList';
import IframeResponsive from '../components/mdxcomponents/iframe';
import { Typography, Grid } from '@material-ui/core';

const IndexPage: React.SFC<RouterProps> = ({ location }) => (
  <Layout location={location}>
    <Grid container spacing={32}>
      <Grid item>
        <Typography variant="h1">Software Report</Typography>
        <Typography variant="h2" gutterBottom>
          Digital Fabrication Lab App
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

        <Typography variant="h3" gutterBottom>
          Summary
        </Typography>
        <Typography variant="body1">
          We created the starting point for a Digital Fabrication Lab app.
          Before being ready for use, it should definitely get some help, but
          we're quite happy with what we have achieved in this short time.
        </Typography>
        <br />
        <IframeResponsive
          src="https://www.youtube.com/embed/-K6AyFTyryI"
          ratio={16 / 9}
        />
      </Grid>

      <Grid item xs={12}>
        <hr />
      </Grid>

      <Grid item style={{ width: '100%' }}>
        <Typography variant="h2" component="h3" color="primary" gutterBottom>
          Table of Contents
        </Typography>
        <ChapterList />
      </Grid>
    </Grid>
  </Layout>
);

export default IndexPage;
