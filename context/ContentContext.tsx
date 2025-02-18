'use client';

import { createContext, useContext } from 'react';

interface ContentType {
  contentProps: object[];
}

const ContentContext = createContext<ContentType>({
  contentProps: [],
});

export function ContentProvider({
  children,
  contentProps,
}: {
  children: React.ReactNode;
  contentProps: object[];
}) {
  return (
    <ContentContext.Provider value={{ contentProps }}>
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
