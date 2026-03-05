import { create } from 'zustand';

interface ActiveServiceType {
  activeService: string;
  setActiveService: (value: string) => void;
}

export const useActiveServiceStore = create<ActiveServiceType>((set) => ({
  activeService: '',
  setActiveService: (value: string) => set({ activeService: value })
}));
