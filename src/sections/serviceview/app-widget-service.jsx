import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { formatName } from 'src/utils/format-Name';

export default function AppWidgetService({ title, icon, color = 'primary', sx,domainKey, ...other }) {
  const navigate = useNavigate();

  const handleRequestService = () => {
    navigate('/serviceADemender', { state: { title, domainKey } });
  };

  return (
    <Card
      component={Stack}
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 250, 
        height: 200, 
        px: 3,
        py: 3,
        borderRadius: 2,
        boxShadow: 3,
        textAlign: 'center',
        ...sx,
      }}
      {...other}
    >
      {icon && <Box sx={{ mb: 2 }}>{icon}</Box>}

      <Typography variant="h6" sx={{ mb: 2 }}>
        {formatName(title) }
      </Typography>

      <Button
        variant="contained"
        color={color}
        onClick={handleRequestService}
        sx={{
          fontSize: '0.875rem', 
          px: 2, 
          py: 1, 
        }}
      >
        Demander le service
      </Button>
    </Card>
  );
}

AppWidgetService.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string.isRequired,
  domainKey: PropTypes.string.isRequired,

};
