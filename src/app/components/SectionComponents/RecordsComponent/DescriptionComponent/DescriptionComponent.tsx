import Earth from '@/app/components/SvgComponents/Earth/Earth';
import BandcampLogo from '@/app/components/SvgComponents/SocialsLogo/BandcampLogo';
import SpotifyLogo from '@/app/components/SvgComponents/SocialsLogo/SpotifyLogo';
import Vinyl from '@/app/components/SvgComponents/Vinyl/Vinyl';
import { PrismicNextLink } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import React, { useEffect } from 'react';
import {
  RecordDocumentData,
  Simplify,
} from '../../../../../../prismicio-types';

export default function DescriptionComponent({
  currentRecord,
  styles,
}: {
  currentRecord: Simplify<RecordDocumentData> | undefined;
  styles: { readonly [key: string]: string };
}) {
  useEffect(() => {
    console.log(currentRecord);
  }, [currentRecord]);

  return (
    <>
      {currentRecord && (
        <div className={styles.descriptionContainer}>
          <div className={styles.titleContainer}>
            <p className={styles.text}>
              {currentRecord.release_number && currentRecord.release_number < 10
                ? `0${currentRecord.release_number}`
                : currentRecord.release_number}
            </p>
          </div>
          <div className={styles.rightContainerLower}>
            <div className={styles.title}>
              <Vinyl height="24" width="24" fill="#494C4F" />
              <div className={styles.title}>
                <PrismicRichText field={currentRecord.title} />
              </div>
            </div>

            {currentRecord.has_merch && (
              <div className={styles.subtitle}>
                <p>MERCHANDISE AVAILABLE</p>
              </div>
            )}
            <div className={styles.text}>
              <p>{currentRecord.record_text}</p>
            </div>
            <div className={styles.socials}>
              <PrismicNextLink field={currentRecord.bandcamp_link}>
                <BandcampLogo height={24} width={24} />
              </PrismicNextLink>
              <PrismicNextLink field={currentRecord.spotify_link}>
                <SpotifyLogo height={22} width={22} />
              </PrismicNextLink>

              {currentRecord.has_own_website && (
                <PrismicNextLink field={currentRecord.website_link}>
                  <Earth height={22} width={22} />
                </PrismicNextLink>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
