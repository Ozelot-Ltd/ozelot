import RecordComponent from './RecordComponent/RecordComponent';

import MainContainer from '../MainContainer';

export default function RecordsComponent({
  isRecordsActive,
  transitionEnd
}: {
  isRecordsActive: boolean;
  transitionEnd?: boolean;
}) {
  return (
    <MainContainer>
      {isRecordsActive && transitionEnd && <RecordComponent />}
    </MainContainer>
  );
}
