'use client';

import { useContents } from '@/context/ContentContext';
import { PrismicRichText, JSXMapSerializer } from '@prismicio/react';

import styles from './StudioContent.module.css';
import SocialBar from '../../ContactComponent/components/SocialBar';
import LegalButton from '@/components/LegalButton/LegalButton';
import LegalComponent from '@/components/LegalComponent/LegalComponent';
import RightContainer from './RightContainer/RightContainer';
import ContactButton from '@/components/ContactButton/ContactButton';

type Props = {
  isStudioActive?: boolean;
  transitionEnd?: boolean;
};

export default function StudioContent({}: Props) {
  const { studio } = useContents();

  const data = studio.data;

  const components: JSXMapSerializer = {
    heading3: ({ children }) => <h1>{children}</h1>
  };

  return (
    <div className={styles.container}>
      <LegalComponent />

      <div className={styles.leftContainer}>
        <div className={styles.titleContainer}>
          <PrismicRichText field={data.subtitle} components={components} />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.descriptionContainer}>
            <PrismicRichText field={data.ozelot_description} />
          </div>
          <div className={styles.ctacontact}>
            <ContactButton
              text={data.contact_link.text}
              windowEventText="contact_from_studio"
              height="12"
              variant="studio"
            />
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <SocialBar /> <LegalButton />
        </div>
      </div>
      <RightContainer />
    </div>
  );
}
