import { create } from 'zustand';

interface SplashscreenState {
  isSplashscreenFinished: boolean;
  setIsSplashscreenFinished: (value: boolean) => void;
  isSceneLoaded: boolean;
  setIsSceneLoaded: (value: boolean) => void;
}

export const isSplashscreenFinishedStore = create<SplashscreenState>((set) => ({
  isSplashscreenFinished: false,
  setIsSplashscreenFinished: (value: boolean) =>
    set({ isSplashscreenFinished: value }),
  isSceneLoaded: false,
  setIsSceneLoaded: (value: boolean) => set({ isSceneLoaded: value }),
}));
