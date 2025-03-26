import React from 'react';

import styles from './Service.module.css';
import { ServiceDocument } from '../../../../../../../prismicio-types';
import { PrismicRichText } from '@prismicio/react';

type Props = {
  service: ServiceDocument;
  activeService: string;
};

const Service = ({ service, activeService }: Props) => {
  const index = service.data.service_index ?? 0;

  console.log(activeService);

  return (
    <div className={styles.container}>
      <p>{index && index < 10 ? `0${index}` : index}</p>
      <PrismicRichText field={service.data.title} />
      {service.data.services_list.map((item, i) => (
        <div key={i}>
          <PrismicRichText field={item.listitem} />
        </div>
      ))}
      <PrismicRichText field={service.data.text} />
    </div>
  );
};

export default Service;
