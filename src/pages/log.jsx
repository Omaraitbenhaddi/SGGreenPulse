import { Helmet } from 'react-helmet-async';

import { LogView } from 'src/sections/logview/log';


// ----------------------------------------------------------------------

export default function ServicePage() {
  return (
    <>
      <Helmet>
        <title> Log  </title>
      </Helmet>

      
      <LogView />


    </>
  );
}
