import React from 'react';

import styles from './MobileMenu.module.css';
import { GroupField } from '@prismicio/client';
import {
  SettingsDocumentDataNavigationItemsLeftItem,
  SettingsDocumentDataNavigationItemsRightItem,
  Simplify,
} from '../../../../../prismicio-types';

type MobileMenuProps = {
  isClicked?: string;
  setIsClicked?: (value: string) => void;
  isNavigationActive?: boolean;
  setIsNavigationActive?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRecordsActive?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsProjectsActive?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsStudioActive?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsContactActive?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsServicesActive?: React.Dispatch<React.SetStateAction<boolean>>;
  isRecordsActive?: boolean;
  left: GroupField<Simplify<SettingsDocumentDataNavigationItemsLeftItem>>;
  right: GroupField<Simplify<SettingsDocumentDataNavigationItemsRightItem>>;
};

export default function MobileMenu({
  setIsClicked,
  setIsNavigationActive,
  isNavigationActive = false,
  left,
  right,
}: MobileMenuProps) {
  const handleClick = (target: string) => {
    if (setIsClicked) {
      setIsClicked(target);
    }
    if (setIsNavigationActive) {
      setIsNavigationActive(!isNavigationActive);
    }
  };

  console.log(left, right);

  const navigationArray = [...left, ...right];

  console.log(navigationArray);

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navlist}>
        {navigationArray.map((item, index) => (
          <li
            key={index}
            onClick={() =>
              handleClick(item?.navigation_link?.text?.toLowerCase() ?? '')
            }
            className={styles.navitem}
          >
            <p>0{index + 1}</p>
            <h3> {item.navigation_link.text}</h3>
          </li>
        ))}
      </ul>
    </nav>
  );
}
