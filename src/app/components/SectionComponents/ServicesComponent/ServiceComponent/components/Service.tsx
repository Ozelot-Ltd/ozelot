import React from 'react';

import styles from './Service.module.css';
import { ServiceDocument } from '../../../../../../../prismicio-types';
import { PrismicRichText } from '@prismicio/react';
import Earth from '@/app/components/SvgComponents/Earth/Earth';
import Arrow from '@/app/components/SvgComponents/Arrow/Arrow';

type Props = {
  service: ServiceDocument;
  activeService: string;
};

const Service = ({ service, activeService }: Props) => {
  const index = service.data.service_index ?? 0;

  console.log(activeService);

  return (
    <div className={styles.container}>
      <div className={styles.upperContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.index}>
            <p>{index && index < 10 ? `0${index}` : index}</p>
          </div>
          <div className={styles.title}>
            <PrismicRichText field={service.data.title} />
            <Arrow />
          </div>
        </div>
        <div className={styles.services}>
          {service.data.services_list.map((item, i) => (
            <div key={i} className={styles.service}>
              <div className={styles.icon}>
                <Earth />
              </div>
              <PrismicRichText field={item.listitem} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.lowerContainer}></div>
    </div>
  );
};

export default Service;
