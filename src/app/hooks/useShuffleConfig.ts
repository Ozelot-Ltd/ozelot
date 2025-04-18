interface ShuffleItem {
  color: string;
  roughness: number;
  accent?: boolean;
}

const accents = ['#4060ff', '#20ffa0', '#ff4060', '#ffcc00'] as const;

const shuffle = (accent: number = 0): ShuffleItem[] => [
  { color: '#fff', roughness: 0.1 },
  { color: '#fff', roughness: 0.75 },
  // { color: '#444', roughness: 0.75 },
  // { color: 'white', roughness: 0.1 },
  // { color: 'white', roughness: 0.75 },
  // { color: 'white', roughness: 0.1 },
  { color: accents[accent], roughness: 0.1, accent: true },
  { color: accents[accent], roughness: 0.75, accent: true },
  { color: accents[accent], roughness: 0.1, accent: true },
];

export const useShuffleConfig = {
  accents,
  shuffle,
} as const;
