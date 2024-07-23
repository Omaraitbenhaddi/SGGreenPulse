import { Helmet } from 'react-helmet-async';

import { ServiceView } from 'src/sections/serviceview/service';

// ----------------------------------------------------------------------

export default function ServicePage() {
  return (
    <>
      <Helmet>
        <title> Service  </title>
      </Helmet>

      <ServiceView />
    </>
  );
}
