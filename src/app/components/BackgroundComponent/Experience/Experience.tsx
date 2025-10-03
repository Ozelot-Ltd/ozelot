import { Float, CameraShake } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { ShirtM } from './components/ShirtM';
import { LightingSetup } from './components/LightingSetup';
import { SparklesSetup } from './components/SparklesSetup';
import { StudioEnvironment } from './components/StudioEnvironment';
import { DevPerformanceMonitor } from './components/PerformanceMonitor';
import { useFadeAnimation } from '@/app/hooks/useFadeAnimation';
import { isClickedStore } from '@/app/stores/IsClickedStore';
import { SCENE_CONFIG } from './config/sceneConfig';

function ShirtGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const isClicked = isClickedStore((state) => state.isClicked);
  const lastClickStateRef = useRef('');

  // Use the custom fade animation hook
  const {
    animateFade,
    getCurrentOpacity,
    setOpacity,
    cleanupAnimation,
    fadeMaterial,
  } = useFadeAnimation();

  // Handle section transitions
  useEffect(() => {
    // Detect direction of transition
    const isGoingToSection = !lastClickStateRef.current && isClicked;
    const isReturningHome = lastClickStateRef.current && !isClicked;

    if (isGoingToSection) {
      // Going to a section - fade IN the overlay (making shirt invisible)
      animateFade({
        startOpacity: getCurrentOpacity(),
        targetOpacity: 1,
        duration: SCENE_CONFIG.ANIMATION.FADE_OUT_DURATION,
      });
    } else if (isReturningHome) {
      // Returning home - delay then fade OUT the overlay (making shirt visible)
      // First ensure we're fully faded in (shirt invisible)
      setOpacity(1);

      // Set delay before starting fade-out
      setTimeout(() => {
        animateFade({
          startOpacity: 1,
          targetOpacity: 0,
          duration: SCENE_CONFIG.ANIMATION.FADE_IN_DURATION,
        });
      }, SCENE_CONFIG.ANIMATION.RETURN_DELAY);
    }

    // Update last state
    lastClickStateRef.current = isClicked;

    // Cleanup on unmount
    return () => {
      cleanupAnimation();
    };
  }, [isClicked, animateFade, getCurrentOpacity, setOpacity, cleanupAnimation]);

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
        <primitive object={fadeMaterial} attach="material" />
      </mesh>
    </>
  );
}

export const Experience = () => {
  return (
    <Canvas shadows camera={SCENE_CONFIG.CAMERA} gl={SCENE_CONFIG.CANVAS}>
      <color attach="background" args={[SCENE_CONFIG.BACKGROUND_COLOR]} />
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
