import React from 'react';

import styles from './RecordsPlaceholder.module.css';

type Props = {
  artist?: string;
};

export default function RecordsPlaceholder({}: Props) {
  return <div className={styles.placeholderContainer}>RecordsPlaceholder</div>;
}
