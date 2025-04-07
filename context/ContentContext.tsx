import { createContext } from 'react';

import { useContext } from 'react';

import {
  StudioDocument,
  ContactDocument,
  ProjectDocument,
  RecordDocument,
  ServiceDocument,
  ArtDirectionIconDocument,
  ThreedIconDocument,
  WebIconDocument,
  GeneralIconDocument,
  SoundDesignIconDocument,
  GraphicIconDocument,
  AiIconDocument,
  SocialBarDocument,
} from '../prismicio-types';

export type ContentProps = {
  studio: StudioDocument;
  contact: ContactDocument;
  projectArray: ProjectDocument[];
  recordArray: RecordDocument[];
  serviceArray: ServiceDocument[];
  threeDIcon: ThreedIconDocument;
  artDirectionIcon: ArtDirectionIconDocument;
  webIcon: WebIconDocument;
  generalIcon: GeneralIconDocument;
  soundDesignIcon: SoundDesignIconDocument;
  graphicDesignIcon: GraphicIconDocument;
  aIIcon: AiIconDocument;
  socialBar: SocialBarDocument;
};

// ContentContext.tsx
const ContentContext = createContext<ContentProps | undefined>(undefined);

export function ContentProvider({
  children,
  contentProps,
}: {
  children: React.ReactNode;
  contentProps: ContentProps;
}) {
  return (
    <ContentContext.Provider value={contentProps}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContents() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('Error using EventsContext');
  }
  return context;
}
