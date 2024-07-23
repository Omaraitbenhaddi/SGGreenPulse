import React from 'react';

import { Alert } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

export const renderErrorCard = (title, subheader) => (
  <Card  >
    <CardHeader title={title} subheader={subheader} />
        <Alert severity="error" sx={{ m: 2  }}>
              Error loading chart data.
      </Alert>
  </Card>

);

