import * as React from 'react';
import { RouterProps } from '@reach/router';

import Layout from '../components/layout';
import ChapterList from '../components/ChapterList';
import { Typography } from '@material-ui/core';

const IndexPage: React.SFC<RouterProps> = ({ location }) => (
  <Layout location={location}>
    <div>
      <h1>Software Report</h1>
      <h2>Digital Fabrication App</h2>
      <p>
        A report by Group 8
        <ul>
          <li>Avelien Husen (4432436)</li>
          <li>Annemar Marinissen (4429842)</li>
          <li>Nils Westhoff (4364678)</li>
        </ul>
        Coach: Adrie Kooiman
      </p>
    </div>
    <div>
      <Typography variant="h3" style={{ marginBottom: '2rem' }}>
        Table of Contents
      </Typography>
      <hr />
      <ChapterList />
    </div>
  </Layout>
);

export default IndexPage;
