'use client';

import React, { useEffect, useState } from 'react';
import styles from './Contact.module.css';
import { useContents } from '../../../../../../context/ContentContext';
import { PrismicRichText } from '@prismicio/react';
import Star from '../../../../../../public/images/star.png';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import { lottieSources } from '../../ServicesComponent/ServiceComponent/components/Service';
import SocialBar from './SocialBar';
import ContactForm from './ContactForm';
import Image from 'next/image';

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
        <div className={styles.lottieContainer}>
          <DotLottieReact autoplay loop src={cube} />
        </div>
        <div className={styles.textContainer}>
          <PrismicRichText field={contact.data.contact_title} />
          <PrismicRichText field={contact.data.contact_text} />
        </div>

        <SocialBar />
      </section>
      <section className={styles.rightContainer}>
        <div className={styles.contactus}>
          <h2>CONTACT US</h2>
          <Image src={Star} height={20} width={20} alt="star.png" />
          <h2>CONTACT US</h2>
          <Image src={Star} height={20} width={20} alt="star.png" />
          <h2>CONTACT US</h2>
        </div>
        <ContactForm contact={contact} />
        <div className={styles.contactus}>
          <h2>CONTACT US</h2>
          <Image src={Star} height={20} width={20} alt="star.png" />
          <h2>CONTACT US</h2>
          <Image src={Star} height={20} width={20} alt="star.png" />
          <h2>CONTACT US</h2>
        </div>
      </section>{' '}
    </section>
  );
}
