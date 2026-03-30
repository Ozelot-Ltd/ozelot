import { ProjectDocumentData, Simplify } from '@/prismicio-types';

import styles from './ContactPhrase.module.css';
import Link from 'next/link';
import Arrow from '@/components/SvgComponents/Arrow/Arrow';

export const ContactPhrase = ({
  clickEventText,
  color
}: {
  currentProject?: Simplify<ProjectDocumentData> | undefined;
  clickEventText: string;
  color?: string;
}) => {
  return (
    <div className={styles.contactPhrase}>
      <Link
        href="/contact"
        onClick={() => {
          const titleText = clickEventText;
          window.sa_event?.(titleText);
        }}
        style={{ color: `${color ? color : 'var(--black)'}` }}
      >
        contact us <Arrow height="12" fill={color ? color : 'var(--black)'} />
      </Link>
    </div>
  );
};
