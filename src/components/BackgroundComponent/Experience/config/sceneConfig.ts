// Scene configuration constants
export const SCENE_CONFIG = {
  // Background and fog
  BACKGROUND_COLOR: "#ebebeb",
  FOG_COLOR: "#ebebeb",
  FOG_DENSITY: 0.0045,
  
  // Camera settings
  CAMERA: {
    position: [0, 0, 7] as [number, number, number],
    fov: 30,
  },
  
  // Canvas settings
  CANVAS: {
    alpha: true,
    antialias: false,
    powerPreference: "high-performance" as WebGLPowerPreference,
    dpr: [1, 1.5] as [number, number],
  },
  
  // Animation timing
  ANIMATION: {
    FADE_OUT_DURATION: 400, // ms - fade out shirt (fade in overlay)
    FADE_IN_DURATION: 500, // ms - fade in shirt (fade out overlay)
    RETURN_DELAY: 200, // ms
  },
  
  // Shirt positioning and scaling
  SHIRT: {
    position: [0, 0, 0] as [number, number, number],
    scale: 1.2,
    modelScale: 0.5,
  },
  
  // Camera shake settings
  CAMERA_SHAKE: {
    maxYaw: 0.03,
    maxPitch: 0.05,
    maxRoll: 0.03,
    yawFrequency: 0.1,
    pitchFrequency: 0.12,
    rollFrequency: 0.08,
    intensity: 0.62,
  },
} as const;
