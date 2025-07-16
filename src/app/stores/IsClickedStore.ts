import { create } from 'zustand';

interface ClickedState {
  isClicked: string;
  setIsClicked: (value: string) => void;
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;
}

export const isClickedStore = create<ClickedState>((set) => ({
  isClicked: '',
  setIsClicked: (value: string) => set({ isClicked: value }),
  isAnimating: false,
  setIsAnimating: (value: boolean) => set({ isAnimating: value }),
}));
