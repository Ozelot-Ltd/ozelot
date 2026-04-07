import { useEffect, useState } from 'react';

import styles from './NewsletterSuccess.module.css';

import { useRouter } from 'next/navigation';

export default function NewsletterSuccess() {
  const router = useRouter();

  const [isWindowVisible, setIsWindowVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsWindowVisible(false);
    }, 6500);
    setTimeout(() => {
      router.push('/');
    }, 7500);
  }, [router, setIsWindowVisible]);

  return (
    <div className={`${styles.main} ${!isWindowVisible ? styles.hidden : ''}`}>
      <h1>Thank you!</h1>
      <h2>You have succesfully subscribed to our newsletter!</h2>
    </div>
  );
}
