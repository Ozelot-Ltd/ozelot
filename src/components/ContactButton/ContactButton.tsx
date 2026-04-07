'use client';

import { useRouter } from 'next/navigation';
import Arrow from '../SvgComponents/Arrow/Arrow';
import styles from './ContactButton.module.css';
import Link from 'next/link';

import { useMobile } from '@/context/MobileContext';

type ContactButtonProps = {
  text?: string;
  height?: string;
  windowEventText: string;
  variant: 'studio' | 'service' | 'project';
};

export default function ContactButton({
  text = 'contact',
  height,
  windowEventText,
  variant
}: ContactButtonProps) {
  const router = useRouter();
  const { isMobile } = useMobile();

  const onClick = () => {
    router.push('/contact');
    window.sa_event?.(windowEventText);
  };

  return (
    <>
      {variant === 'studio' && (
        <Link
          href="/contact"
          onClick={onClick}
          className={`${styles.contactbutton} ${styles[variant]}`}
        >
          <span>{text}</span>
          <Arrow
            height={height ? height : '16'}
            width={height ? height : '16'}
            fill="var(--lightgrey)"
          />
        </Link>
      )}
      {variant === 'service' && (
        <Link
          href="/contact"
          onClick={onClick}
          className={`${styles.contactbutton} ${styles[variant]}`}
        >
          <span>{text}</span>
          <Arrow
            height={height ? height : `${!isMobile ? '14' : '11'}`}
            width={height ? height : `${!isMobile ? '14' : '11'}`}
            fill="var(--black)"
          />
        </Link>
      )}

      {variant === 'project' && (
        <Link
          href="/contact"
          onClick={onClick}
          className={`${styles.contactbutton} ${styles[variant]}`}
        >
          <span>{text}</span>
          <Arrow
            height={height ? height : `${!isMobile ? '12' : '11'}`}
            width={height ? height : `${!isMobile ? '12' : '11'}`}
            fill="var(--lightgrey)"
          />
        </Link>
      )}
    </>
  );
}
