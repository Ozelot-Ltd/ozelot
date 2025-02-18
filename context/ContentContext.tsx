import { createContext } from 'react';

import { useContext } from 'react';

import {
  StudioDocument,
  ProjectsDocument,
  RecordsDocument,
  ContactDocument,
  ProjectDocument,
} from '../prismicio-types';

export type ContentProps = {
  studio: StudioDocument;
  projects: ProjectsDocument;
  records: RecordsDocument;
  contact: ContactDocument;
  projectArray: ProjectDocument[];
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
