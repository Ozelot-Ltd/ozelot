'use client';

import React, { useEffect, useState } from 'react';
import styles from './Contact.module.css';
import { useContents } from '../../../../../../context/ContentContext';
import { useRouter } from 'next/navigation';

export default function Contact({
  isContactActive,
  transitionEnd,
}: {
  isContactActive: boolean;
  transitionEnd: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);

  const { contact } = useContents();
  const router = useRouter();

  console.log(isVisible);

  useEffect(() => {
    setIsVisible(isContactActive && transitionEnd);
  }, [isContactActive, transitionEnd]);

  return (
    <section className={styles.container}>
      <section className={styles.leftContainer}></section>
      <section className={styles.rightContainer}></section>
    </section>
  );
}
