import React from 'react';

export default function RecordComponent({
  isRecordsActive,
  transitionEnd,
}: {
  isRecordsActive: boolean;
  transitionEnd: boolean;
}) {
  return (
    <div>
      {isRecordsActive && transitionEnd && 'jöklfdasjölkafsdjlökafsdljkö'}
    </div>
  );
}
