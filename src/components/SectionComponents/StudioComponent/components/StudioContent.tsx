'use client';

import { useContents } from '@/context/ContentContext';
import { PrismicRichText, JSXMapSerializer } from '@prismicio/react';

import styles from './StudioContent.module.css';
import SocialBar from '../../ContactComponent/components/SocialBar';
import LegalButton from '@/components/LegalButton/LegalButton';
import LegalComponent from '@/components/LegalComponent/LegalComponent';
import Arrow from '@/components/SvgComponents/Arrow/Arrow';
import { useRouter } from 'next/navigation';
import RightContainer from './RightContainer/RightContainer';

type Props = {
  isStudioActive?: boolean;
  transitionEnd?: boolean;
};

export default function StudioContent({}: Props) {
  const { studio } = useContents();

  const data = studio.data;

  const router = useRouter();

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
          <div className={styles.addressContainer}>
            <p
              onClick={() => {
                router.push('/contact');
                window.sa_event?.(`contact_from_studio`);
              }}
            >
              {data.contact_link.text}
              <Arrow height="12" />
            </p>
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
