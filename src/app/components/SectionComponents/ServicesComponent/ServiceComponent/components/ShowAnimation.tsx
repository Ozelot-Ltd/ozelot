import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

type Props = {
  showElement: boolean;
  serviceType: string;
  lottieSources: Record<string, string>;
};

export default function ShowAnimation({
  showElement,
  serviceType,
  lottieSources,
}: Props) {
  if (showElement && serviceType && lottieSources[serviceType]) {
    return <DotLottieReact autoplay loop src={lottieSources[serviceType]} />;
  } else if (!showElement && serviceType && lottieSources[serviceType]) {
    return null;
  }

  return null;
}
