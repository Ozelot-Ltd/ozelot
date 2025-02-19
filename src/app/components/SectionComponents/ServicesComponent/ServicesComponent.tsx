import React from 'react';

export default function ServicesComponent({
  isServicesActive,
  transitionEnd,
}: {
  isServicesActive: boolean;
  transitionEnd: boolean;
}) {
  return <div>{isServicesActive && transitionEnd}asdfadsfasfdasdfasfd</div>;
}
