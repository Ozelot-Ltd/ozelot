'use client';

import React, { useState } from 'react';
import { ContactDocument } from '../../../../../../prismicio-types';
import styles from './ContactForm.module.css';
import Arrow from '@/app/components/SvgComponents/Arrow/Arrow';

type Props = { contact: ContactDocument };

export default function ContactForm({ contact }: Props) {
  const [agreement, setAgreement] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleClick = function (e: React.MouseEvent) {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <form className={styles.form}>
      <div className={styles.inputContainer}>
        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <span className={styles.inputArrow}>
              <Arrow />
            </span>
            <input id="name" type="text" name="name" placeholder="YOUR NAME" />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <span className={styles.inputArrow}>
              <Arrow />
            </span>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="YOUR EMAIL"
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <textarea id="text" name="text" placeholder="YOUR REQUEST" />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.radioContainer}>
            <div
              className={styles.checkboxContainer}
              onClick={() => setNewsletter(!newsletter)}
            >
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                value="newsletter"
                className={`${styles.checkbox} ${newsletter ? styles.checked : ''}`}
              />
            </div>
            <label htmlFor="newsletter">sign me up for your newsletter!</label>
          </div>{' '}
          <div className={styles.radioContainer}>
            <div
              className={styles.checkboxContainer}
              onClick={() => setAgreement(!agreement)}
            >
              <input
                type="checkbox"
                id="privacy-agreement"
                name="privacy"
                value="privacy"
                className={`${styles.checkbox} ${agreement ? styles.checked : ''}`}
              />
            </div>
            <label htmlFor="privacy-agreement">We agree to this and that</label>
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button type="submit" onClick={handleClick}>
          {!isSent
            ? contact.data.contact_button_text
            : 'THANKS FOR YOUR MESSAGE!'}
          <span
            className={`${styles.arrowContainer} ${isSent ? styles.sent : ''}`}
          >
            <Arrow height="16" />
          </span>
        </button>
      </div>
    </form>
  );
}
