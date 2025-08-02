import { Stage, Float } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useEffect, useCallback } from 'react';
import { ShirtM } from './ShirtM';
import * as THREE from 'three';
import { isClickedStore } from '@/app/stores/IsClickedStore';
import dynamic from 'next/dynamic';

// Conditionally import Perf component only in development
const Perf =
  process.env.NODE_ENV === 'development'
    ? dynamic(() => import('r3f-perf').then((module) => module.Perf), {
        ssr: false,
      })
    : () => null;

// Website background color from CSS variables
const WEBSITE_BG_COLOR = '#ebebeb'; // --lightgrey from globals.css

// Create a single shared material for the fade plane
const fadeMaterial = new THREE.MeshBasicMaterial({
  color: WEBSITE_BG_COLOR,
  transparent: true,
  depthTest: false,
  opacity: 0, // Start with fully transparent (shirt visible)
  blending: THREE.NormalBlending,
});

function ShirtGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const isClicked = isClickedStore((state) => state.isClicked);
  const setIsAnimating = isClickedStore((state) => state.setIsAnimating);

  // Animation refs
  const animationRef = useRef<number | null>(null);
  const currentOpacityRef = useRef(0); // Start with 0 opacity (shirt visible)
  const isAnimatingRef = useRef(false);
  const isReturningRef = useRef(false);
  const lastClickStateRef = useRef('');

  // Constants for animation timing
  const FADE_OUT_DURATION = 400; // ms - fade out shirt (fade in overlay)
  const FADE_IN_DURATION = 500; // ms - fade in shirt (fade out overlay)
  const RETURN_DELAY = 200; // ms

  // Clean up any running animation
  const cleanupAnimation = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  // Pure JS animation function for maximum performance
  const animateFade = useCallback(
    (
      startOpacity: number,
      targetOpacity: number,
      duration: number,
      onComplete?: () => void
    ) => {
      cleanupAnimation();

      const startTime = performance.now();
      isAnimatingRef.current = true;
      setIsAnimating(true);

      const animate = () => {
        const now = performance.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function - simple cubic ease
        const easedProgress =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        // Calculate new opacity
        const newOpacity =
          startOpacity + (targetOpacity - startOpacity) * easedProgress;

        // Update material directly
        fadeMaterial.opacity = newOpacity;
        currentOpacityRef.current = newOpacity;

        // Continue animation if not complete
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Animation complete
          isAnimatingRef.current = false;
          setIsAnimating(false);
          if (onComplete) onComplete();
        }
      };

      // Start animation loop
      animationRef.current = requestAnimationFrame(animate);
    },
    [cleanupAnimation, setIsAnimating]
  );

  // Handle section transitions
  useEffect(() => {
    // Detect direction of transition
    const isGoingToSection = !lastClickStateRef.current && isClicked;
    const isReturningHome = lastClickStateRef.current && !isClicked;

    if (isGoingToSection) {
      // Going to a section - fade IN the overlay (making shirt invisible)
      animateFade(currentOpacityRef.current, 1, FADE_OUT_DURATION);
    } else if (isReturningHome) {
      // Returning home - delay then fade OUT the overlay (making shirt visible)
      isReturningRef.current = true;

      // First ensure we're fully faded in (shirt invisible)
      fadeMaterial.opacity = 1;
      currentOpacityRef.current = 1;

      // Set delay before starting fade-out
      setTimeout(() => {
        isReturningRef.current = false;
        animateFade(1, 0, FADE_IN_DURATION);
      }, RETURN_DELAY);
    }

    // Update last state
    lastClickStateRef.current = isClicked;

    // Cleanup on unmount
    return () => {
      cleanupAnimation();
    };
  }, [isClicked, setIsAnimating, animateFade, cleanupAnimation]);

  return (
    <>
      <group ref={groupRef} position={[0, 0.8, 0]} scale={1.2}>
        <Suspense fallback={null}>
          <directionalLight position={[3, 1.5, 4]} intensity={2.5} />
          <Float
            speed={5.75}
            rotationIntensity={0.2}
            floatIntensity={1}
            floatingRange={[-0.05, 0.05]}
          >
            <ShirtM />
          </Float>
          <Stage adjustCamera={false} environment="warehouse" />
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

export const ExperienceAlt = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 1, 7], fov: 30 }}
      gl={{
        antialias: false, // Disable antialiasing for performance
        powerPreference: 'high-performance',
      }}
      dpr={[1, 1.5]} // Limit pixel ratio for better performance
    >
      <color attach="background" args={[WEBSITE_BG_COLOR]} />
      <fog attach="fog" args={[WEBSITE_BG_COLOR, 5, 20]} />
      <ShirtGroup />
      {/* Only show performance monitor in development */}
      {process.env.NODE_ENV === 'development' && <Perf position="top-left" />}
    </Canvas>
  );
};
