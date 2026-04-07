import { useRef, useCallback } from 'react';
import * as THREE from 'three';
import { FadeAnimationParams } from '@/types';

// Create a single shared material for the fade plane
const fadeMaterial = new THREE.MeshBasicMaterial({
  color: '#262626', // --lightgrey
  transparent: true,
  depthTest: false,
  opacity: 0, // Start with fully transparent (shirt visible)
  blending: THREE.NormalBlending,
});

export const useFadeAnimation = () => {
  const animationRef = useRef<number | null>(null);
  const currentOpacityRef = useRef(0);
  const isAnimatingRef = useRef(false);

  // Clean up any running animation
  const cleanupAnimation = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  // Pure JS animation function for maximum performance
  const animateFade = useCallback(
    ({
      startOpacity,
      targetOpacity,
      duration,
      onComplete,
    }: FadeAnimationParams) => {
      cleanupAnimation();

      const startTime = performance.now();
      isAnimatingRef.current = true;

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
          if (onComplete) onComplete();
        }
      };

      // Start animation loop
      animationRef.current = requestAnimationFrame(animate);
    },
    [cleanupAnimation]
  );

  // Get current opacity
  const getCurrentOpacity = useCallback(() => currentOpacityRef.current, []);

  // Set opacity directly (for immediate changes)
  const setOpacity = useCallback((opacity: number) => {
    fadeMaterial.opacity = opacity;
    currentOpacityRef.current = opacity;
  }, []);

  // Check if currently animating
  const isAnimating = useCallback(() => isAnimatingRef.current, []);

  return {
    animateFade,
    getCurrentOpacity,
    setOpacity,
    isAnimating,
    cleanupAnimation,
    fadeMaterial,
  };
};
