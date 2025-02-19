import React from 'react';

export default function ContactComponent({
  isContactActive,
  transitionEnd,
}: {
  isContactActive: boolean;
  transitionEnd: boolean;
}) {
  console.log(isContactActive);
  return (
    <div>
      {transitionEnd && isContactActive && 'jlköfasöljkafdslöjkfdslköjfdsaklöj'}
    </div>
  );
}
