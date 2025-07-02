'use client';

import React, { useEffect, useState } from 'react';
import styles from './Contact.module.css';
import { useContents } from '../../../../../../context/ContentContext';
import { PrismicRichText } from '@prismicio/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import { lottieSources } from '../../ServicesComponent/ServiceComponent/components/Service';
import SocialBar from './SocialBar';
import ContactForm from './ContactForm';
import FadeIn from '@/app/components/FadeIn/FadeIn';

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
          <FadeIn delay={0.8} yDown={500} duration={2}>
            <div className={styles.title}>
              <PrismicRichText field={contact.data.contact_title} />
            </div>
          </FadeIn>
          <div className={styles.lottieContainer}>
            <DotLottieReact autoplay loop src={cube} />
          </div>
        </div>
        <div className={styles.textContainer}>
          <PrismicRichText field={contact.data.contact_text} />
        </div>
        <div className={styles.socialBarContainer}>
          <SocialBar />
        </div>
      </section>

      <section className={styles.rightContainer}>
        <FadeIn delay={0} inlineStyle={{ padding: '0.5rem 0' }}>
          <h1>GET IN TOUCH WITH US</h1>
        </FadeIn>
        <ContactForm contact={contact} />
      </section>
    </section>
  );
}
