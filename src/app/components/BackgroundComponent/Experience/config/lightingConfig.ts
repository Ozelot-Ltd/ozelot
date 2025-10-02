// Lighting configuration for the 3D scene
export const LIGHTING_CONFIG = {
  // Ambient lighting
  AMBIENT: {
    intensity: 0.5,
  },
  
  // Hemisphere lighting
  HEMISPHERE: {
    skyColor: "#b7d0ff",
    groundColor: "#0a0a0a",
    intensity: 0.12,
    position: [0, 2, 0] as [number, number, number],
  },
  
  // Key light (main directional light)
  KEY_LIGHT: {
    position: [4.6, 3.8, 0.6] as [number, number, number],
    intensity: 3.6,
    color: "#e6f0ff",
    castShadow: true,
    shadowMapSize: [2048, 2048] as [number, number],
    shadowCamera: {
      near: 0.5,
      far: 18,
      left: -4,
      right: 4,
      top: 4,
      bottom: -4,
    },
  },
  
  // Fill light
  FILL_LIGHT: {
    position: [-3.8, 1.4, 0.8] as [number, number, number],
    intensity: 0.35,
    color: "#ffffff",
  },
  
  // Rim light
  RIM_LIGHT: {
    position: [-5.2, 3.2, -2.2] as [number, number, number],
    intensity: 3.6,
    color: "#ffd7b3",
  },
  
  // Hair/top light
  HAIR_LIGHT: {
    position: [0, 5.4, 0.6] as [number, number, number],
    intensity: 0.75,
    color: "#dfeaff",
  },
} as const;
