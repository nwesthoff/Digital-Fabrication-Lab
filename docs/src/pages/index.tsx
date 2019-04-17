import * as React from 'react';
import { RouterProps } from '@reach/router';

import Layout from '../components/layout';
import ChapterList from '../components/ChapterList';
import IframeResponsive from '../components/mdxcomponents/iframe';
import { Typography, Grid, Button } from '@material-ui/core';
import GitLogo from '../components/mdxcomponents/GitLogo';
import NetlifyLogo from '../images/netlify-logo.svg';
import AndroidLogo from '../images/android-logo.svg';
import FeaturedImage from '../images/featured-image.png';
import LinkIcon from '@material-ui/icons/Link';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import AttachmentIcon from '@material-ui/icons/Attachment';

const IndexPage: React.SFC<RouterProps> = ({ location }) => (
  <Layout location={location}>
    <Grid container spacing={32}>
      <Grid item>
        <Typography variant="h1">Software Report</Typography>
        <Typography variant="h2" color="primary" gutterBottom>
          Digital Fabrication Lab App
        </Typography>
      </Grid>
      <Grid item>
        <img src={FeaturedImage} style={{ maxWidth: '100%' }} />
      </Grid>
      <Grid item>
        <Grid container spacing={32}>
          <Grid item>
            <Typography variant="overline" color="secondary">
              4432436
            </Typography>
            <Button href="http://avelien.com" target="blank">
              <LinkIcon style={{ margin: '.4rem', height: '24px' }} />
              Avelien Husen
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="overline" color="secondary">
              4429842
            </Typography>
            <Typography variant="button" style={{ margin: '.7rem 8px' }}>
              Annemar Marinissen
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="overline" color="secondary">
              4364678
            </Typography>
            <Button href="https://nilswesthoff.com" target="blank">
              <LinkIcon style={{ margin: '.4rem', height: '24px' }} />
              Nils Westhoff
            </Button>
          </Grid>
        </Grid>

        <br />
        <Typography variant="overline">Group 8</Typography>
        <Typography variant="overline" gutterBottom>
          Coach: Adrie Kooijman
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
            <Button
              href="https://drive.google.com/file/d/1NFZizdAoEI2Ov-ayUhmZzycUnUpbb7NI/view"
              target="blank"
              color="primary"
              style={{ paddingRight: '1rem' }}
            >
              <AttachmentIcon style={{ margin: '.4rem', height: '24px' }} />
              PDF Report
            </Button>
          </Grid>
          <Grid item>
            <Button
              href="https://docs.google.com/presentation/d/1H7uXI0MGrLFXm7Q9k2d0zYrBFxZ-vOgu7pqImVZlxk4/"
              target="blank"
              color="secondary"
              style={{ paddingRight: '1rem' }}
            >
              <SlideshowIcon style={{ margin: '.4rem', height: '24px' }} />
              Slideshow
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
