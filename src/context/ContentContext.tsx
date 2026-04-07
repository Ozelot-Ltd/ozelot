import { createContext } from 'react';

import { useContext } from 'react';

import {
  StudioDocument,
  ContactDocument,
  ProjectDocument,
  RecordDocument,
  ServicenewDocument,
  ArtDirectionIconDocument,
  ThreedIconDocument,
  WebIconDocument,
  GeneralIconDocument,
  SoundDesignIconDocument,
  GraphicIconDocument,
  AiIconDocument,
  SocialBarDocument,
  ServicesOfferedDocument,
  LegalDocument,
  AddressDocument,
  BrandingIconDocument,
  ProjectsGifDocument,
  ServiceMainContentDocument
} from '@/prismicio-types';

export type ContentProps = {
  studio: StudioDocument;
  contact: ContactDocument;
  projectArray: ProjectDocument[];
  recordArray: RecordDocument[];
  serviceArray: ServicenewDocument[];
  threeDIcon: ThreedIconDocument;
  artDirectionIcon: ArtDirectionIconDocument;
  webIcon: WebIconDocument;
  generalIcon: GeneralIconDocument;
  soundDesignIcon: SoundDesignIconDocument;
  graphicDesignIcon: GraphicIconDocument;
  aIIcon: AiIconDocument;
  socialBar: SocialBarDocument;
  servicesOffered: ServicesOfferedDocument;
  legal: LegalDocument;
  address: AddressDocument;
  brandingIcon: BrandingIconDocument;
  projectsGif: ProjectsGifDocument;
  servicesMain: ServiceMainContentDocument;
};

// ContentContext.tsx
const ContentContext = createContext<ContentProps | undefined>(undefined);

export function ContentProvider({
  children,
  contentProps
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
