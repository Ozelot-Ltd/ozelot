import React from 'react';
import { ProjectDocumentData } from '../../../../../prismicio-types';

import ArtDirection from '../ArtDirection/ArtDirection';
import ThreeD from '../ThreeD/ThreeD';
import WebIcon from '../WebIcon/WebIcon';
import GeneralIcon from '../GeneralIcon/GeneralIcon';
import SoundDesignIcon from '../SoundDesign/SoundDesign';

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
      case 'web':
        return <WebIcon />;
      case 'general':
        return <GeneralIcon />;
      case 'sounddesign':
        return <SoundDesignIcon />;
      default:
        return null;
    }
  };

  return <>{Icon()}</>;
}
