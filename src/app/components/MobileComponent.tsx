import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  isClicked?: string;
  setIsClicked: (value: string) => void;
  setSide: Dispatch<SetStateAction<'' | 'left' | 'right' | 'bottom'>>;
  router: {
    push: (path: string) => void;
  };
};

import Logo from './SvgComponents/Logo/Logo';

import mobileStyles from './MobileComponent.module.css';
import styles from './MainComponent.module.css';

export default function MobileComponent({
  isClicked = '',
  setIsClicked,
  setSide,
  router,
}: Props) {
  return (
    <div className={mobileStyles.main}>
      <div className={mobileStyles.logocontainer}>
        <div
          onClick={() => {
            setIsClicked('');
            setSide('');
            router.push('/');
          }}
          className={`${styles.logo} ${isClicked !== '' ? styles.animate : ''}`}
        >
          <Logo height={'32'} />
        </div>
      </div>
    </div>
  );
}
