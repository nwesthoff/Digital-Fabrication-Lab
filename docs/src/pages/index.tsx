import * as React from 'react';
import { RouterProps } from '@reach/router';

import Layout from '../components/layout';
import ChapterList from '../components/ChapterList';
import IframeResponsive from '../components/mdxcomponents/iframe';
import { Typography, Grid, Button } from '@material-ui/core';
import GitLogo from '../components/mdxcomponents/GitLogo';
import NetlifyLogo from '../images/netlify-logo.svg';
import AndroidLogo from '../images/android-logo.svg';

const IndexPage: React.SFC<RouterProps> = ({ location }) => (
  <Layout location={location}>
    <Grid container spacing={32}>
      <Grid item>
        <Typography variant="h1">Software Report</Typography>
        <Typography variant="h2" color="primary" gutterBottom>
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
      </Grid>

      <Grid item xs={12}>
        <hr />
      </Grid>

      <Grid item>
        <Typography variant="h3" gutterBottom>
          Summary
        </Typography>
        <Typography variant="body1">
          We created the starting point for a Digital Fabrication Lab app.
          Before being ready for use, it should definitely get some help, but
          we're quite happy with what we have achieved in this short time.
        </Typography>
        <br />
        <br />
        <IframeResponsive
          src="https://www.youtube.com/embed/-K6AyFTyryI"
          ratio={16 / 9}
        />
        <br />
        <br />
        <Typography variant="h3" gutterBottom>
          Important Links
        </Typography>
        <Typography variant="body1" gutterBottom>
          These are the most important results of our report. Download the apk
          from the release page, or have a look at the operator admin (currently
          you can log in without credentials).
        </Typography>
        <Grid container spacing={8}>
          <Grid item>
            <Button
              href="https://github.com/nwesthoff/Digital-Fabrication-Lab/releases"
              style={{ paddingRight: '1rem' }}
            >
              <img
                style={{ height: 24, width: 24, margin: '.4rem' }}
                src={AndroidLogo}
              />
              Android APK
            </Button>
          </Grid>
          <Grid item>
            <Button
              href="https://digital-fabrication-lab-admin.netlify.com"
              target="blank"
              style={{ paddingRight: '1rem' }}
            >
              <img
                style={{ height: 24, width: 24, margin: '.4rem' }}
                src={NetlifyLogo}
              />
              Operator Admin
            </Button>
          </Grid>
          <Grid item>
            <GitLogo src="https://github.com/nwesthoff/Digital-Fabrication-Lab" />
          </Grid>
        </Grid>
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
