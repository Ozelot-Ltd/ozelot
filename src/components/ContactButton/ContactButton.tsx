'use client';

import { useRouter } from 'next/navigation';
import Arrow from '../SvgComponents/Arrow/Arrow';
import styles from './ContactButton.module.css';
import Link from 'next/link';

type Props = {
  text?: string;
  height?: string;
  windowEventText: string;
  variant: 'studio' | 'service' | 'project';
};

export default function ContactButton({
  text,
  height,
  windowEventText,
  variant
}: Props) {
  const router = useRouter();

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
          <span>{text ? text : 'contact us'}</span>
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
          <span>{text ? text : 'contact us'}</span>
          <Arrow
            height={height ? height : '16'}
            width={height ? height : '16'}
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
          <span>{text ? text : 'contact us'}</span>
          <Arrow
            height={height ? height : '12'}
            width={height ? height : '12'}
            fill="var(--lightgrey)"
          />
        </Link>
      )}
    </>
  );
}
