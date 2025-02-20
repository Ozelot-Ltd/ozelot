import { createContext } from 'react';

import { useContext } from 'react';

import {
  StudioDocument,
  ContactDocument,
  ProjectDocument,
  RecordDocument,
} from '../prismicio-types';

export type ContentProps = {
  studio: StudioDocument;
  contact: ContactDocument;
  projectArray: ProjectDocument[];
  recordArray: RecordDocument[];
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
