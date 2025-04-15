'use client';

import React, { useEffect, useState } from 'react';
import styles from './Contact.module.css';
import { useContents } from '../../../../../../context/ContentContext';
import { PrismicRichText } from '@prismicio/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import { lottieSources } from '../../ServicesComponent/ServiceComponent/components/Service';
import SocialBar from './SocialBar';
import ContactForm from './ContactForm';

export default function Contact({
  isContactActive,
  transitionEnd,
}: {
  isContactActive: boolean;
  transitionEnd: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);

  const cube = lottieSources['3d'];

  const { contact } = useContents();

  console.log(isVisible);

  useEffect(() => {
    setIsVisible(isContactActive && transitionEnd);
  }, [isContactActive, transitionEnd]);

  return (
    <section className={styles.container}>
      <section className={styles.leftContainer}>
        <div className={styles.titleContainer}>
          <PrismicRichText field={contact.data.contact_title} />
          <div className={styles.lottieContainer}>
            <DotLottieReact autoplay loop src={cube} />
          </div>
        </div>

        <div className={styles.textContainer}>
          <PrismicRichText field={contact.data.contact_text} />
        </div>
        <SocialBar />
      </section>
      <section className={styles.rightContainer}>
        <h1>GET IN TOUCH WITH US</h1>
        <ContactForm contact={contact} />
      </section>
    </section>
  );
}
