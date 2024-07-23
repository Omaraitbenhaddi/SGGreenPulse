import { useLocation } from 'react-router-dom';
import React, {  useState ,useEffect } from 'react';

import { Grid, Paper,Alert, Container, Typography } from '@mui/material';

import { fetchLogs } from 'src/api/playbook';

const LogsView = () => {
    const location = useLocation();
    const { state } = location;
    const [error, setError ] = useState(null)
    const [logs, setLogs] = useState('');

    useEffect(() => {


        fetchLogs(setLogs, state ,setError);
    }, [state]);

    return (
        <Container maxWidth="xl">
                    {error && (
                        <Alert severity="error">
                        {error}
                        </Alert>
                    )}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper style={{ padding: '20px', backgroundColor: '#333', color: '#fff' }}>
                        <Typography variant="h6">Ansible Playbook Logs</Typography>
                        <Typography component="pre" style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
                            {logs || 'Loading logs...'}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default LogsView;
