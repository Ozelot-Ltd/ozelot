import ImageComponent from '@/components/SectionComponents/RecordsComponent/ImageComponent/ImageComponent';
import styles from './ImageContainer.module.css';
import {
  ProjectDocument,
  ProjectDocumentData,
  Simplify
} from '@/prismicio-types';

type ImageContainerProps = {
  currentProject: Simplify<ProjectDocumentData> | undefined;
  activeProject: string | ProjectDocument;
};

export default function ImageContainer({
  currentProject,
  activeProject
}: ImageContainerProps) {
  const placeholderURL =
    'https://res.cloudinary.com/ddkwj78mq/video/upload/v1759222722/websitevideo_compressed_ilku8j.mp4';

  return (
    <div className={styles.imageContainer}>
      {!currentProject && (
        <div
          className={styles.previewContainer}
          style={{ pointerEvents: 'none' }}
        >
          <video
            src={`${placeholderURL}`}
            controls={false}
            autoPlay
            loop
            muted
            playsInline
            className={styles.sliderVideoProject}
          />
        </div>
      )}
      {currentProject && (
        <ImageComponent
          key={activeProject as string}
          currentProject={currentProject}
        />
      )}
    </div>
  );
}
