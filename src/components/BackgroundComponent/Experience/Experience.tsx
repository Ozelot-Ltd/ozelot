import { Float, CameraShake } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { ShirtM } from './components/ShirtM';
import { LightingSetup } from './components/LightingSetup';
import { SparklesSetup } from './components/SparklesSetup';
import { StudioEnvironment } from './components/StudioEnvironment';
import { DevPerformanceMonitor } from './components/PerformanceMonitor';

import { SCENE_CONFIG } from './config/sceneConfig';

function ShirtGroup() {
  const groupRef = useRef<THREE.Group>(null);

  // Handle section transitions

  return (
    <>
      <group
        ref={groupRef}
        position={SCENE_CONFIG.SHIRT.position}
        scale={SCENE_CONFIG.SHIRT.scale}
      >
        <Suspense fallback={null}>
          <LightingSetup />

          <Float
            speed={5.75}
            rotationIntensity={0.2}
            floatIntensity={1}
            floatingRange={[-0.05, 0.05]}
          >
            <ShirtM />
          </Float>

          <SparklesSetup type="shirt" />
          <StudioEnvironment />
        </Suspense>
      </group>

      {/* High-performance fade overlay */}
      <mesh renderOrder={1000} position={[0, 0, 6]} frustumCulled={false}>
        <planeGeometry args={[100, 100]} />
      </mesh>
    </>
  );
}

export const Experience = () => {
  return (
    <Canvas shadows camera={SCENE_CONFIG.CAMERA} gl={SCENE_CONFIG.CANVAS}>
      <fogExp2
        attach="fog"
        args={[SCENE_CONFIG.FOG_COLOR, SCENE_CONFIG.FOG_DENSITY]}
      />

      <SparklesSetup type="background" />
      <ShirtGroup />

      {process.env.NODE_ENV === 'development' && <DevPerformanceMonitor />}

      <CameraShake
        maxYaw={SCENE_CONFIG.CAMERA_SHAKE.maxYaw}
        maxPitch={SCENE_CONFIG.CAMERA_SHAKE.maxPitch}
        maxRoll={SCENE_CONFIG.CAMERA_SHAKE.maxRoll}
        yawFrequency={SCENE_CONFIG.CAMERA_SHAKE.yawFrequency}
        pitchFrequency={SCENE_CONFIG.CAMERA_SHAKE.pitchFrequency}
        rollFrequency={SCENE_CONFIG.CAMERA_SHAKE.rollFrequency}
        intensity={SCENE_CONFIG.CAMERA_SHAKE.intensity}
      />
    </Canvas>
  );
};
