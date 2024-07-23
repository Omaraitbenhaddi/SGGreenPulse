import React from 'react';
import PropTypes from 'prop-types';

import DomainGrid from './domain-grid-service';

const DomainSection = ({ domains }) => (
  <>
    {Object.keys(domains).map((domainKey) => (
      <DomainGrid key={domainKey} domainKey={domainKey} titles={domains[domainKey]} />
    ))}
  </>
);

DomainSection.propTypes = {
  domains: PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.string)
  ).isRequired,
};

export default DomainSection;
