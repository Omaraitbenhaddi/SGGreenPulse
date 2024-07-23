import React, { useState, useEffect } from 'react';

import { Grid , Alert, Container } from '@mui/material';

import { fetchAllDomains } from 'src/api/playbook';

import DomainSection from '../domain-section-service';

const ServiceView = () => {
  const [domains, setDomains] = useState({});
  const [error, setError ] = useState(null)

  useEffect(() => {

    fetchAllDomains(setDomains,setError)
  }, []);

  return (
    <Container maxWidth="xl">
        {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}
      <Grid container spacing={3}>
        <DomainSection domains={domains} />
      </Grid>
    </Container>
  );
};

export default ServiceView;
