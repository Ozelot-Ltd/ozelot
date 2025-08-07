import React from 'react';
import MainContainer from '../MainContainer';

import ServiceComponent from './ServiceComponent/ServiceCompontent';

export default function ServicesComponent({
  isServicesActive,
  transitionEnd,
}: {
  isServicesActive: boolean | undefined;
  transitionEnd: boolean | undefined;
}) {
  return (
    <MainContainer>
      {isServicesActive && transitionEnd && <ServiceComponent />}
    </MainContainer>
  );
}
