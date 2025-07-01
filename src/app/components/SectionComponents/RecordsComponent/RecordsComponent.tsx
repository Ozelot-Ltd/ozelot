import React from 'react';

import RecordComponent from './RecordComponent/RecordComponent';

import MainContainer from '../MainContainer';

export default function RecordsComponent({
  isRecordsActive,
  transitionEnd,
}: {
  isRecordsActive: boolean;
  transitionEnd?: boolean;
}) {
  console.log('RecordsComponent rendered', isRecordsActive, transitionEnd);
  return (
    <MainContainer>
      {isRecordsActive && transitionEnd && (
        <RecordComponent
          isRecordsActive={isRecordsActive}
          transitionEnd={transitionEnd}
        />
      )}
    </MainContainer>
  );
}
