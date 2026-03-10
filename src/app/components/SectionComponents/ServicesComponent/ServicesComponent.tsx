import { useEffect } from 'react';

import MainContainer from '../MainContainer';

import ServiceComponent from './ServiceComponent/ServiceCompontent';

export default function ServicesComponent({
  isServicesActive,
  transitionEnd
}: {
  isServicesActive: boolean | undefined;
  transitionEnd: boolean | undefined;
}) {
  useEffect(() => {
    console.log(isServicesActive);
  }, [isServicesActive]);
  return (
    <MainContainer>
      {isServicesActive && transitionEnd && <ServiceComponent />}
    </MainContainer>
  );
}
