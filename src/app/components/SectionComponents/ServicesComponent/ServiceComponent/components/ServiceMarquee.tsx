import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import styles from './ServiceMarquee.module.css';
import { useContents } from '@/context/ContentContext';

export default function ServiceMarquee() {
  const { servicesMain } = useContents();

  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marquee}>
        <Marquee
          gradient={false}
          speed={20}
          autoFill={true}
          style={{
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            width: '200rem'
          }}
        >
          <div className={styles.imageContainer}>
            {servicesMain.data.images
              ?.filter(
                (image) => typeof image.asset_id === 'string' && image.asset_id
              )
              .map((image, index) => (
                <Image
                  key={index}
                  src={image.asset_id as string}
                  alt={image.alt || ''}
                  width={200}
                  height={200}
                  className={styles.image}
                />
              ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
}
