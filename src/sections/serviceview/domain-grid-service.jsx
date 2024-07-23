import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppWidgetSummary from './app-widget-service';

const DomainGrid = ({ domainKey, titles }) => (
  <Grid key={domainKey} xs={12}>
    <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
      {domainKey}
    </Typography>
    <Grid container spacing={3}>
      {titles.map((title, index) => (
        <Grid key={index} xs={12} sm={6} md={3}>
          <AppWidgetSummary title={title} color="info" domainKey={domainKey} />
        </Grid>
      ))}
    </Grid>
  </Grid>
);

DomainGrid.propTypes = {
  domainKey: PropTypes.string.isRequired,
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DomainGrid;
