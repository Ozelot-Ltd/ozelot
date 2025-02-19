import React from 'react';

export default function StudioComponent({
  isStudioActive,
}: {
  isStudioActive: boolean;
}) {
  console.log(isStudioActive);
  return <div>StudioComponent</div>;
}
