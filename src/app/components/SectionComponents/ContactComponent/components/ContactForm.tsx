'use client';

import React, { useState, useEffect } from 'react';
import { ContactDocument } from '../../../../../../prismicio-types';
import styles from './ContactForm.module.css';
import Arrow from '@/app/components/SvgComponents/Arrow/Arrow';

type Props = { contact: ContactDocument };

export default function ContactForm({ contact }: Props) {
  const [agreement, setAgreement] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

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
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button type="submit">
          {contact.data.contact_button_text} <Arrow height="16" />
        </button>
      </div>
    </form>
  );
}
