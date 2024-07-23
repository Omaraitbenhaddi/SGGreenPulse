import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import { Alert } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { formatName } from 'src/utils/format-Name';

import { submitForm } from '../SubmitForm';
import VariablesForm from '../VariablesForm';



const DemandeView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, domainKey } = location.state;
  const [submissionResult, setSubmissionResult] = useState(null);
  const [error, setError] = useState(null);



  const handleFormSubmit = async (values) => {
    const result = await submitForm(values, title, domainKey, setError);
    setSubmissionResult(result);
    navigate('/service');
  };

  return (
    <Container maxWidth="md">
      
      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}
      
      <Typography variant="h4" sx={{ mb: 4 }}>
        {formatName(title)} - Variables
      </Typography>
      <VariablesForm domainKey={domainKey} title={title} onSubmit={handleFormSubmit} />
      {submissionResult && (
        <Box mt={4}>
          <Typography variant="h6">Submission Result</Typography>
          <Typography variant="h4" color="success.main">Service demandé avec succès</Typography>
        </Box>
      )}
    </Container>
  );
};

export default DemandeView;
