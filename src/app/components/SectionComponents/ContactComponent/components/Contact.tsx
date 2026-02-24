'use client';

import styles from './Contact.module.css';
import { useContents } from '../../../../../../context/ContentContext';
import { PrismicRichText } from '@prismicio/react';

import SocialBar from './SocialBar';
import ContactForm from './ContactForm';
import FadeIn from '@/app/components/FadeIn/FadeIn';
import LegalComponent from '@/app/components/LegalComponent/LegalComponent';

export default function Contact() {
  const { contact } = useContents();

  return (
    <section className={styles.container}>
      <section className={styles.leftContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.textContainer}>
            <PrismicRichText field={contact.data.contact_text} />
          </div>
        </div>

        <div className={styles.socialBarContainer}>
          <SocialBar />
        </div>
      </section>

      <section className={styles.rightContainer}>
        <LegalComponent />
        <FadeIn delay={0} inlineStyle={{ padding: '0.5rem 0' }}>
          <PrismicRichText field={contact.data.newsletter_title} />
        </FadeIn>
        <ContactForm contact={contact} />
      </section>
    </section>
  );
}
