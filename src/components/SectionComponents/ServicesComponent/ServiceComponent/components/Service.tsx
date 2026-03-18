import styles from './Service.module.css';
import { ServicenewDocument } from '@/prismicio-types';
import { PrismicRichText } from '@prismicio/react';
import ServiceItems from './ServiceItems';

type Props = {
  service: ServicenewDocument;
};

const Service = ({ service }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftcontainer}>
        <div className={styles.titlecontainer}>
          <h2 className={styles.index}>0{service.data.index}</h2>
          <h2>–</h2>
          <div className={styles.titletext}>
            <PrismicRichText field={service.data.title} />
          </div>
        </div>
      </div>
      <div className={styles.rightcontainer}>
        <div className={styles.uppercontainer}>
          <div className={styles.interludecontainer}>
            <PrismicRichText field={service.data.interlude} />
          </div>
        </div>
        <ServiceItems service={service} />
      </div>
    </div>
  );
};

export default Service;
