'use client';

import styles from './Contact.module.css';
import { useContents } from '@/context/ContentContext';
import { JSXMapSerializer, PrismicRichText } from '@prismicio/react';

import SocialBar from './SocialBar';
import ContactForm from './ContactForm';
import FadeIn from '@/components/FadeIn/FadeIn';
import LegalComponent from '@/components/LegalComponent/LegalComponent';

export default function Contact() {
  const { contact } = useContents();

  const components: JSXMapSerializer = {
    heading1: ({ children }) => <h4>{children}</h4>
  };

  return (
    <section className={styles.container}>
      <section className={styles.leftContainer}>
        <div className={styles.textContainer}>
          <PrismicRichText field={contact.data.contact_text} />
        </div>
        <div className={styles.socialBarContainer}>
          <SocialBar />
        </div>
      </section>

      <section className={styles.rightContainer}>
        <LegalComponent />
        <FadeIn delay={0}>
          <PrismicRichText
            field={contact.data.newsletter_title}
            components={components}
          />
        </FadeIn>
        <ContactForm contact={contact} />
      </section>
    </section>
  );
}
