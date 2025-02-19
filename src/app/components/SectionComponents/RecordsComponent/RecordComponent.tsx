import React from 'react';

export default function RecordComponent({
  isRecordsActive,
}: {
  isRecordsActive: boolean;
}) {
  return <div>{isRecordsActive}</div>;
}
