import { createContext } from 'react';

import { useContext } from 'react';

import {
  StudioDocument,
  ContactDocument,
  ProjectDocument,
  RecordDocument,
  ArtDirectionIconDocument,
  ThreedIconDocument,
} from '../prismicio-types';

export type ContentProps = {
  studio: StudioDocument;
  contact: ContactDocument;
  projectArray: ProjectDocument[];
  recordArray: RecordDocument[];
  threeDIcon: ThreedIconDocument;
  artDirectionIcon: ArtDirectionIconDocument;
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
