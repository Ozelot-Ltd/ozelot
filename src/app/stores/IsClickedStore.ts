import { create } from 'zustand';

interface ClickedState {
  isClicked: string;
  setIsClicked: (value: string) => void;
}

export const isClickedStore = create<ClickedState>((set) => ({
  isClicked: '',
  setIsClicked: (value: string) => set({ isClicked: value }),
}));
