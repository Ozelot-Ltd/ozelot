import React from 'react';
import { ProjectDocumentData } from '../../../../../prismicio-types';

import ArtDirection from '../ArtDirection/ArtDirection';
import ThreeD from '../ThreeD/ThreeD';

type Props = {
  currentProject: ProjectDocumentData;
};

export default function IconSwitchComponent({ currentProject }: Props) {
  const Icon = () => {
    switch (currentProject?.is_main_discipline) {
      case 'direction':
        return <ArtDirection />;
      case '3d':
        return <ThreeD />;
      default:
        return null;
    }
  };

  return <>{Icon()}</>;
}
