import { Helmet } from 'react-helmet-async';

import { LogView } from 'src/sections/logview/log';

// ----------------------------------------------------------------------

export default function MachinesPage() {
  return (
    <>
      <Helmet>
        <title> Machines </title>
      </Helmet>

      <LogView />
    </>
  );
}