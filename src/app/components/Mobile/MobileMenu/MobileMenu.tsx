import React from 'react';

type MobileMenuProps = {
  isClicked?: string;
  setIsClicked?: (value: string) => void;
  isNavigationActive?: boolean;
  setIsNavigationActive?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MobileMenu({
  setIsClicked,
  setIsNavigationActive,
  isNavigationActive = false,
}: MobileMenuProps) {
  const handleClick = () => {
    if (setIsClicked) {
      setIsClicked('test');
    }
    if (setIsNavigationActive) {
      setIsNavigationActive(!isNavigationActive);
    }
  };

  return (
    <div>
      <nav>
        <h1 onClick={() => handleClick()}>Test</h1>
      </nav>
    </div>
  );
}
