import { create } from 'zustand';

interface SplashscreenState {
  isSplashscreenFinished: boolean;
  setIsSplashscreenFinished: (value: boolean) => void;
}

export const isSplashscreenFinishedStore = create<SplashscreenState>((set) => ({
  isSplashscreenFinished: false,
  setIsSplashscreenFinished: (value: boolean) =>
    set({ isSplashscreenFinished: value }),
}));
