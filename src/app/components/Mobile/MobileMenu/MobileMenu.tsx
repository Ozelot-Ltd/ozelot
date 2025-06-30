import React from 'react';

type MobileMenuProps = {
  isClicked?: string;
  setIsClicked?: (value: string) => void;
};

export default function MobileMenu({
  setIsClicked,
}: MobileMenuProps & {
  isClicked?: string;
  setIsClicked?: (value: string) => void;
}) {
  return (
    <div>
      <nav>
        <h1 onClick={() => setIsClicked && setIsClicked('test')}>Test</h1>
      </nav>
    </div>
  );
}
