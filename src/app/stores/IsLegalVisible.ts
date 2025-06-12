import { create } from 'zustand';

interface LegalState {
  isLegalVisible: boolean;
  setIsLegalVisible: (value: boolean) => void;
}

export const isLegalVisibleStore = create<LegalState>((set) => ({
  isLegalVisible: false,
  setIsLegalVisible: (value: boolean) => set({ isLegalVisible: value }),
}));
