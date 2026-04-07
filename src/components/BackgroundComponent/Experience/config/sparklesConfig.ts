// Sparkles configuration for ambient effects
export const SPARKLES_CONFIG = {
  // Shirt sparkles (close-up)
  SHIRT: {
    count: 180,
    size: 1.35,
    speed: 0.45,
    opacity: 0.75,
    color: "#e6f0ff",
    scale: [6, 3, 9] as [number, number, number],
    position: [0, -0.2, 0] as [number, number, number],
    noise: [0.4, 1.6, 0.4] as [number, number, number],
  },
  
  // Background sparkles (distant ambient)
  BACKGROUND: {
    count: 120,
    size: 3,
    speed: 0.33,
    opacity: 0.35,
    color: "#0f0f0f",
    scale: [12, 3, 12] as [number, number, number],
    position: [0, 0, 0] as [number, number, number],
    noise: [0.21, 0.3, 0.21] as [number, number, number],
  },
} as const;
