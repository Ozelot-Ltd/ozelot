import { Dispatch, RefObject, SetStateAction } from 'react';

export default function startLoader(
  currentValue: number,
  setCurrentValue: Dispatch<SetStateAction<number>>,
  counterRef: RefObject<HTMLHeadingElement | null>,
  delay: number
) {
  function updateCounter() {
    setCurrentValue((prevValue) => {
      if (prevValue >= 100) {
        return 100;
      }

      let newValue = prevValue + Math.floor(Math.random() * 5 + 1);

      if (newValue > 100) {
        newValue = 100;
      }

      if (counterRef.current) {
        counterRef.current.textContent = newValue.toString();
      }

      if (newValue < 100) {
        setTimeout(updateCounter, delay);
      }

      return newValue;
    });
  }

  updateCounter();
}
