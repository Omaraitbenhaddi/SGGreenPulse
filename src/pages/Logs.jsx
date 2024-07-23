import { Helmet } from 'react-helmet-async';

import { LogsView } from 'src/sections/logsview/service';

// ----------------------------------------------------------------------

export default function ServicePage() {
  return (
    <>
      <Helmet>
        <title> Log  </title>
      </Helmet>

      <LogsView />
    </>
  );
}
