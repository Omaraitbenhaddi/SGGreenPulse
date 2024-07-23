import { Helmet } from 'react-helmet-async';

import { DemandeView } from 'src/sections/demandeview/demande';
// ----------------------------------------------------------------------

export default function DemandePage() {
  return (
    <>
      <Helmet>
        <title> Variable du service </title>
      </Helmet>

      <DemandeView />
    </>
  );
}
