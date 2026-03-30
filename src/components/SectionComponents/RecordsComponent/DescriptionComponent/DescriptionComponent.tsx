import { useEffect, useState } from 'react';
import {
  ProjectDocumentData,
  RecordDocumentData,
  Simplify
} from '../../../../../prismicio-types';

import Earth from '@/components/SvgComponents/Earth/Earth';
import BandcampLogo from '@/components/SvgComponents/SocialsLogo/BandcampLogo';
import SpotifyLogo from '@/components/SvgComponents/SocialsLogo/SpotifyLogo';
import Vinyl from '@/components/SvgComponents/Vinyl/Vinyl';
import { PrismicNextLink } from '@prismicio/next';
import { PrismicRichText, JSXMapSerializer } from '@prismicio/react';

import { useMobile } from '@/context/MobileContext';
import { asText } from '@prismicio/client';
import { ContactPhrase } from './ContactPhrase';

export default function DescriptionComponent({
  currentProject,
  currentRecord,
  styles
}: {
  currentRecord?: Simplify<RecordDocumentData> | undefined;
  currentProject?: Simplify<ProjectDocumentData> | undefined;
  styles: { readonly [key: string]: string };
}) {
  const [height, setHeight] = useState('22');
  const { isMobile } = useMobile();

  useEffect(() => {
    if (isMobile) {
      setHeight('18');
    } else {
      setHeight('22');
    }
  }, [isMobile]);

  const components: JSXMapSerializer = {
    heading2: ({ children }) => <h3>{children}</h3>
  };

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
              <Vinyl fill="var(--black)" height={height} width={height} />
              <div className={styles.title}>
                <PrismicRichText
                  field={currentRecord.title}
                  components={components}
                />
              </div>
            </div>

            <div className={styles.releasetext}>
              <div className={styles.artist}>
                <h4>Artist:</h4>
                <p>{currentRecord.record_text}</p>
              </div>
              <div className={styles.releasename}>
                <h4>Title:</h4>
                <p>{currentRecord.record_title}</p>
              </div>
              <div className={styles.releaseyear}>
                <h4>Year:</h4>
                <p>{currentRecord.record_year}</p>
              </div>
            </div>
            <div className={styles.socials}>
              <PrismicNextLink
                field={currentRecord.bandcamp_link}
                onClick={() => {
                  window.sa_event?.(
                    `bandcamp_${currentRecord.record_title?.toLowerCase()}`
                  );
                }}
              >
                <BandcampLogo height={24} width={24} />
              </PrismicNextLink>
              <PrismicNextLink
                field={currentRecord.spotify_link}
                onClick={() => {
                  window.sa_event?.(
                    `spotify_${currentRecord.record_title?.toLowerCase()}`
                  );
                }}
              >
                <SpotifyLogo height={22} width={22} />
              </PrismicNextLink>

              {currentRecord.has_own_website && (
                <PrismicNextLink
                  field={currentRecord.website_link}
                  onClick={() => {
                    window.sa_event?.(
                      `website_${currentRecord.record_title?.toLowerCase()}`
                    );
                  }}
                >
                  <Earth fill="var(--black)" height={height} width={height} />
                </PrismicNextLink>
              )}
            </div>
          </div>
        </div>
      )}
      {currentProject && (
        <div className={styles.descriptionContainer}>
          <div className={styles.titleContainer}>
            <p className={styles.text}>
              {currentProject.project_number &&
              currentProject.project_number < 10
                ? `0${currentProject.project_number}`
                : currentProject.project_number}
            </p>
          </div>
          <div className={styles.rightContainerLower}>
            <div className={styles.title}>
              {' '}
              <Earth fill="var(--black)" height={height} width={height} />
              <div className={styles.title}>
                <PrismicRichText
                  field={currentProject.title}
                  components={components}
                />
              </div>
            </div>
            <div className={styles.pills}>
              {currentProject.is_3d && (
                <div className={styles.subtitle}>
                  <p>3D & 3D Motion Design</p>
                </div>
              )}
              {currentProject.is_art_direction && (
                <div className={styles.subtitle}>
                  <p>Art Direction</p>
                </div>
              )}
              {currentProject.is_web && (
                <div className={styles.subtitle}>
                  <p>Web & Web3</p>
                </div>
              )}
              {currentProject.is_graphic_design && (
                <div className={styles.subtitle}>
                  <p>Graphics</p>
                </div>
              )}
              {currentProject.is_ai && (
                <div className={styles.subtitle}>
                  <p>Artificial</p>
                </div>
              )}
              {currentProject.is_sound_design && (
                <div className={styles.subtitle}>
                  <p>Sound Design</p>
                </div>
              )}
            </div>

            <div className={styles.description}>
              <PrismicRichText field={currentProject.description} />
            </div>
            <ContactPhrase
              currentProject={currentProject}
              clickEventText={asText(currentProject?.title)}
            />
          </div>
        </div>
      )}
    </>
  );
}
