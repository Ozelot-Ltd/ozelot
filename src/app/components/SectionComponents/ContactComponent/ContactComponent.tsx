import React from 'react';

export default function ContactComponent({
  isContactActive,
}: {
  isContactActive: boolean;
}) {
  console.log(isContactActive);
  return <div>ContactComponent</div>;
}
