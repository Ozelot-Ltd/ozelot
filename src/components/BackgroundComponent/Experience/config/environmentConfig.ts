// Environment lighting configuration for studio reflections
export const ENVIRONMENT_CONFIG = {
  resolution: 256,
  frames: 1,
  
  // Lightformers for studio lighting
  LIGHTFORMERS: [
    {
      form: "rect" as const,
      intensity: 1.6,
      color: "#ffffff",
      position: [0, 7, 8] as [number, number, number],
      scale: [16, 7, 1] as [number, number, number],
      target: [0, 1, 0] as [number, number, number],
    },
    {
      form: "rect" as const,
      intensity: 0.9,
      color: "#ffffff",
      position: [-7, 3.5, 2] as [number, number, number],
      scale: [7, 5, 1] as [number, number, number],
      target: [0, 1, 0] as [number, number, number],
    },
    {
      form: "rect" as const,
      intensity: 1.9,
      color: "#ffd8b0",
      position: [7, 3.2, -2.5] as [number, number, number],
      scale: [8, 5, 1] as [number, number, number],
      target: [0, 1, 0] as [number, number, number],
    },
  ],
} as const;
