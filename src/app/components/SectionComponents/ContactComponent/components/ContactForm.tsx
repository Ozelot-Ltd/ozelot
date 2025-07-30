'use client';

import React, { useState } from 'react';
import { ContactDocument } from '../../../../../../prismicio-types';
import styles from './ContactForm.module.css';
import Arrow from '@/app/components/SvgComponents/Arrow/Arrow';
import FadeIn from '@/app/components/FadeIn/FadeIn';
import { isLegalVisibleStore } from '@/app/stores/IsLegalVisible';

export interface FormData {
  name: string;
  surname: string;
  email: string;
  message: string;
  newsletter: boolean;
}

type Props = { contact: ContactDocument };

export default function ContactForm({ contact }: Props) {
  const [agreement, setAgreement] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const { setIsLegalVisible } = isLegalVisibleStore();

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    message: '',
    newsletter: false,
  });

  const [formStatus, setFormStatus] = useState('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormStatus('submitting');

    try {
      const response = await fetch('/api/emails/main', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();

      console.log('Form submitted successfully:', result);

      if (newsletter) {
        const subscribeResponse = await fetch('/api/emails/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            firstname: formData.name,
            surname: formData.surname,
          }),
        });

        if (!subscribeResponse.ok) {
          throw new Error(
            `Error subscribing to newsletter: ${subscribeResponse.status}`
          );
        }

        const subscribeResult = await subscribeResponse.json();
        console.log('Subscribed to newsletter:', subscribeResult);
      }

      // Set status to success
      setFormStatus('success');
      console.log(formStatus);
      setIsSent(true);

      // Reset form after submission
      setFormData({
        name: '',
        surname: '',
        email: '',
        message: '',
        newsletter: false,
      });

      setAgreement(false);
      setNewsletter(false);

      // Reset heading after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);

      // Set status to error
      setFormStatus('error');

      // Reset heading after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }
  };

  function renderLegalText(
    text: string | null,
    textToSplit: string = 'terms & conditions'
  ) {
    if (!text) return null;

    const parts = text.split(textToSplit);

    if (parts.length === 1) {
      return text;
    }

    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < parts.length - 1 && (
          <span
            className={styles.legalLink}
            onClick={() => setIsLegalVisible(true)}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            terms & conditions
          </span>
        )}
      </React.Fragment>
    ));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <div className={styles.inputGroup}>
          <div className={`${styles.inputWrapper} ${styles.borderBottom}`}>
            <FadeIn yDown={40} duration={0.5} delay={0.1}>
              <span className={styles.inputArrow}>
                <Arrow />
              </span>
            </FadeIn>
            <input
              id="name"
              type="text"
              name="name"
              placeholder={contact.data.contact_input_name ?? 'NAME'}
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.inputGroup}>
          <div className={`${styles.inputWrapper} ${styles.borderBottom}`}>
            <FadeIn yDown={40} duration={0.5} delay={0.2}>
              <span className={styles.inputArrow}>
                <Arrow />
              </span>
            </FadeIn>
            <input
              id="surname"
              type="text"
              name="surname"
              placeholder={contact.data.contact_input_surname ?? 'SURNAME'}
              required
              value={formData.surname}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={`${styles.inputWrapper} ${styles.borderBottom}`}>
            <FadeIn yDown={40} duration={0.5} delay={0.3}>
              <span className={styles.inputArrow}>
                <Arrow />
              </span>
            </FadeIn>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              required
              placeholder={contact.data.contact_input_email ?? 'YOUR EMAIL'}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              name="message"
              placeholder="YOUR REQUEST"
              required
              value={formData.message}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.radioContainer}>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="privacy-agreement"
                name="privacy"
                value="privacy"
                className={`${styles.checkbox} ${agreement ? styles.checked : ''}`}
                checked={agreement}
                required
                aria-required="true"
                onChange={() => setAgreement(!agreement)}
              />
            </div>
            <label
              htmlFor="privacy-agreement"
              onClick={(e) => {
                if ((e.target as HTMLElement).tagName !== 'EM') {
                  e.preventDefault();
                } else {
                  setIsLegalVisible(true);
                }
              }}
            >
              {renderLegalText(contact.data.contact_input_agree)}
            </label>
          </div>
          <div className={styles.radioContainer}>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={newsletter}
                className={`${styles.checkbox} ${newsletter ? styles.checked : ''}`}
                onChange={() => {
                  const newValue = !newsletter;
                  setNewsletter(newValue);
                  setFormData((prev) => ({
                    ...prev,
                    newsletter: newValue ? true : false,
                  }));
                }}
              />
            </div>
            <label htmlFor="newsletter" onClick={(e) => e.preventDefault()}>
              <p>{contact.data.contact_input_newslettertext}</p>
            </label>
          </div>
        </div>
      </div>
      <div
        className={`${styles.buttonContainer} ${!agreement ? styles.disabled : ''}`}
      >
        <button
          type="submit"
          className={`${styles.button} ${!agreement ? styles.disabled : ''}`}
          disabled={!agreement}
        >
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
