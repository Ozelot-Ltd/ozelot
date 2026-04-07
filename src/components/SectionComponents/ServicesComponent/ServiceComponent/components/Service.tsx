import styles from './Service.module.css';
import { ServicenewDocument } from '@/prismicio-types';
import { PrismicRichText } from '@prismicio/react';
import ServiceItems from './ServiceItems';
import FadeIn from '@/components/FadeIn/FadeIn';

type Props = {
  service: ServicenewDocument;
};

const Service = ({ service }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftcontainer}>
        <div className={styles.titlecontainer}>
          <FadeIn yDown={200} delay={1}>
            <h2 className={styles.index}>0{service.data.index}</h2>
          </FadeIn>
          <FadeIn yDown={200} delay={1.4}>
            <h2>–</h2>{' '}
          </FadeIn>

          <FadeIn yDown={200} delay={1}>
            <div className={styles.titletext}>
              <PrismicRichText field={service.data.title} />
            </div>{' '}
          </FadeIn>
        </div>
      </div>
      <div className={styles.rightcontainer}>
        <ServiceItems service={service} />
      </div>
    </div>
  );
};

export default Service;
