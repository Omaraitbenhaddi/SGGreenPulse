import React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fPercent } from 'src/utils/format-number';

import { useFetchData } from 'src/api/playbook';

import ErrorBoundary from '../ErrorBoundary';
import AppWidgetSummary from '../app-widget-summary';
import ServiceRequestWeek from '../sevice-request-week';
import ServiceRequestType from '../service-request-type';
import ServiceOrderTimeline from '../service-order-timeline';
import ServiceRequesterAdmin from '../service-requester-admin';

// ----------------------------------------------------------------------

const AppView = () => {
  const { data: orderTimelineData, error: orderTimelineError } = useFetchData('api/order-timeline/', []);
  const { data: userTaskData, error: userTaskError } = useFetchData('api/task-count-by-user/', []);
  const { data: chartData, error: chartDataError } = useFetchData('api/service-request-week-data/', { labels: [], series: [] });
  const { data: chartSeriesDataCBS, error: chartSeriesErrorCBS } = useFetchData('api/successFailed-processed-count-cbs/', []);
  const { data: chartSeriesDataHorsCBS, error: chartSeriesErrorHorsCBS } = useFetchData('api/successFailed-processed-count-hors-cbs/', []);
  const { data: autoProcessedData, error: autoProcessedError } = useFetchData('api/auto-processed-count/', { total: 0 });
  const { data: cbsProcessedData, error: cbsProcessedError } = useFetchData('api/cbs-processed-count/', { total: 0 });
  const { data: TotalPourcentageData} = useFetchData('api/ServiceRequestEvolutionData/', []);

  const totalAutoProcessed = autoProcessedData.total;
  const totalCBSProcessed = cbsProcessedData.total;
  const HorscbsProcessedError = cbsProcessedError || autoProcessedError ? autoProcessedError : null;
  console.log(TotalPourcentageData)


  return (

<ErrorBoundary>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome to AutoEVT
        </Typography>

        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Nombre total des demandes traiter automatiquement"
              total={totalAutoProcessed}
              color="success"
              error={autoProcessedError}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Demandes CBS traiter automatiquement"
              total={totalCBSProcessed}
              color="info"
              error={cbsProcessedError}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Demandes hors CBS traiter automatiquement"
              total={totalAutoProcessed - totalCBSProcessed}
              color="warning"
              error={HorscbsProcessedError}
            />
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            <ServiceRequestWeek
              title="Service demandé automatiquement"
              subheader= {`(${fPercent(TotalPourcentageData.evolution_percentage)}) par rapport à la semaine dernière`}
              chart={chartData}
              error={chartDataError}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <ServiceOrderTimeline
              title="Chronologie des commandes lancee"
              list={orderTimelineData}
              error={orderTimelineError}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <ServiceRequestType
              title="services demandés cbs "
              chart={{
                series: chartSeriesDataCBS,
              }}
              error={chartSeriesErrorCBS}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <ServiceRequestType
              title="services demandés HorsCbs "
              chart={{
                series: chartSeriesDataHorsCBS,
              }}
              error={chartSeriesErrorHorsCBS}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <ServiceRequesterAdmin
              title="le nombre des taches lancer par personne"
              chart={{
                series: userTaskData,
              }}
              error={userTaskError}
            />
          </Grid>

          



        </Grid>
      </Container>
    </ErrorBoundary>

  );
};

export default AppView;