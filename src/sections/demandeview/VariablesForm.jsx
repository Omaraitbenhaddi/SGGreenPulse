import * as Yup from 'yup';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Form, Field, Formik, ErrorMessage } from 'formik';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { fetchVariables } from 'src/api/playbook';

const VariablesForm = ({ domainKey, title, onSubmit }) => {
  const [variables, setVariables] = useState({});

  useEffect(() => {
    const loadVariables = async () => {
      const fetchedVariables = await fetchVariables(domainKey, title);
      setVariables(fetchedVariables);
    };
    loadVariables();
  }, [domainKey, title]);


  const orderedKeys = ['target', ...Object.keys(variables).filter(key => key !== 'target')];
  const initialValues = orderedKeys.reduce((values, key) => {
    values[key] = variables[key] ?? '';
    return values;
  }, {});

  const validationSchema = Yup.object().shape(
    orderedKeys.reduce((schema, key) => {
      schema[key] = key === 'target' ?
        Yup.string().required('Champ requis') :
        Yup.string().required('Champ requis');
      return schema;
    }, {})
  );

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleSubmit, isSubmitting, values }) => (
        <Form onSubmit={handleSubmit}>
          <Typography variant="h5" gutterBottom>
            Variables du message d affichage
          </Typography>
          {orderedKeys.map((key, index) => (
            <Box sx={{ mb: 2 }} key={index}>
              <Field
                name={key}
                type={key.toLowerCase().includes('password') ? 'password' : 'text'}
                label={key}
                as={TextField}
                fullWidth
                onChange={handleChange}
                value={values[key]}
                InputProps={{
                  style: key === 'target' ? { border: '2px solid blue', borderRadius: '5px', backgroundColor: '#f0f8ff' } : {},
                  endAdornment: key === 'target' ? (
                    <InputAdornment position="end">
                      <Tooltip title="Variable hôte, assurez-vous qu'elle est correctement configurée">
                          <span style={{ color: 'blue', fontWeight: 'bold' }}>!</span>
                      </Tooltip>
                    </InputAdornment>
                  ) : null,
                }}
              />
              <ErrorMessage name={key} component="div" style={{ color: 'red' }} />
            </Box>
          ))}
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            Soumettre
          </Button>
        </Form>
      )}
    </Formik>
  );
};

VariablesForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  domainKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default VariablesForm;
