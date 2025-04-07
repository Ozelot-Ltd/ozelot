import React from 'react';

import { ContactDocument } from '../../../../../../prismicio-types';

import styles from './ContactForm.module.css';

type Props = {
  contact: ContactDocument;
};

export default function ContactForm({ contact }: Props) {
  return (
    <form className={styles.form}>
      <div className={styles.inputContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">{contact.data.contact_input_name}</label>
          <input id="name" type="text" name="name" />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">{contact.data.contact_input_email}</label>
          <input id="email" type="email" name="email" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="text">{contact.data.contact_input_textfield}</label>
          <textarea id="text" name="text" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="text">{contact.data.contact_input_textfield}</label>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button type="submit">{contact.data.contact_button_text}</button>
      </div>
    </form>
  );
}
