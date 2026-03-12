import { LIGHTING_CONFIG } from "../config/lightingConfig";

export const LightingSetup = () => {
  return (
    <>
      {/* Ambient/sky lift */}
      <ambientLight intensity={LIGHTING_CONFIG.AMBIENT.intensity} />

      <hemisphereLight
        args={[
          LIGHTING_CONFIG.HEMISPHERE.skyColor,
          LIGHTING_CONFIG.HEMISPHERE.groundColor,
          LIGHTING_CONFIG.HEMISPHERE.intensity,
        ]}
        position={LIGHTING_CONFIG.HEMISPHERE.position}
      />

      {/* Key (high right side-graze, cool) */}
      <directionalLight
        position={LIGHTING_CONFIG.KEY_LIGHT.position}
        intensity={LIGHTING_CONFIG.KEY_LIGHT.intensity}
        color={LIGHTING_CONFIG.KEY_LIGHT.color}
        castShadow={LIGHTING_CONFIG.KEY_LIGHT.castShadow}
        shadow-mapSize={LIGHTING_CONFIG.KEY_LIGHT.shadowMapSize}
        shadow-camera-near={LIGHTING_CONFIG.KEY_LIGHT.shadowCamera.near}
        shadow-camera-far={LIGHTING_CONFIG.KEY_LIGHT.shadowCamera.far}
        shadow-camera-left={LIGHTING_CONFIG.KEY_LIGHT.shadowCamera.left}
        shadow-camera-right={LIGHTING_CONFIG.KEY_LIGHT.shadowCamera.right}
        shadow-camera-top={LIGHTING_CONFIG.KEY_LIGHT.shadowCamera.top}
        shadow-camera-bottom={LIGHTING_CONFIG.KEY_LIGHT.shadowCamera.bottom}
      />

      {/* Fill (subtle, far left, neutral) */}
      <directionalLight
        position={LIGHTING_CONFIG.FILL_LIGHT.position}
        intensity={LIGHTING_CONFIG.FILL_LIGHT.intensity}
        color={LIGHTING_CONFIG.FILL_LIGHT.color}
      />

      {/* Rim (rear-left, warm) */}
      <directionalLight
        position={LIGHTING_CONFIG.RIM_LIGHT.position}
        intensity={LIGHTING_CONFIG.RIM_LIGHT.intensity}
        color={LIGHTING_CONFIG.RIM_LIGHT.color}
      />

      {/* Hair/top light for luxurious edge highlight */}
      <directionalLight
        position={LIGHTING_CONFIG.HAIR_LIGHT.position}
        intensity={LIGHTING_CONFIG.HAIR_LIGHT.intensity}
        color={LIGHTING_CONFIG.HAIR_LIGHT.color}
      />
    </>
  );
};
