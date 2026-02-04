import { useRef, useState, useCallback, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import { useSpring } from '@react-spring/core';

export const useShirtInteraction = () => {
  const { viewport } = useThree();

  // Interaction state
  const [isDragging, setIsDragging] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  // Refs for immediate state access
  const isDraggingRef = useRef(false);
  const isSpinningRef = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0, z: 0 });
  const currentRotation = useRef({ x: 0, y: 0, z: 0 });
  const baseRotationY = useRef(0);
  const totalSpinRotation = useRef(0);
  const randomRotationOffset = useRef({ x: 0, y: 0, z: 0 });

  // Click/tap detection
  const pointerDownPos = useRef({ x: 0, y: 0 });
  const pointerDownTime = useRef(0);
  const hasMoved = useRef(false);
  const touchSide = useRef<'left' | 'right'>('right');

  // React Spring for return-to-center animation
  const [{ targetX, targetY, targetZ }, api] = useSpring(() => ({
    targetX: 0,
    targetY: 0,
    targetZ: 0,
    config: {
      mass: 1,
      tension: 170,
      friction: 26,
    },
  }));

  // Initialize refs to ensure consistent behavior
  useEffect(() => {
    isDraggingRef.current = false;
    isSpinningRef.current = false;
    currentPosition.current = { x: 0, y: 0, z: 0 };
    currentRotation.current = { x: 0, y: 0, z: 0 };
    baseRotationY.current = 0;
    totalSpinRotation.current = 0;
    randomRotationOffset.current = { x: 0, y: 0, z: 0 };
  }, []);

  // Convert screen coordinates to world coordinates
  const screenToWorld = useCallback(
    (clientX: number, clientY: number) => {
      const rect = document.querySelector('canvas')?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };

      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((clientY - rect.top) / rect.height) * 2 + 1;

      return {
        x: x * (viewport.width / 2),
        y: y * (viewport.height / 2),
      };
    },
    [viewport],
  );

  // Trigger 360-degree spin animation
  const triggerSpin = useCallback(
    (direction: 'left' | 'right') => {
      if (isSpinningRef.current) {
        console.log('Spin blocked - already spinning');
        return;
      }

      // Immediately cancel any dragging that might be in progress
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
      }

      if (direction === 'left') {
        window.sa_event?.('left spin');
      } else if (direction === 'right') {
        window.sa_event?.('right spin');
      }

      console.log(`✅ Triggering 360-degree spin ${direction}`);
      isSpinningRef.current = true;
      setIsSpinning(true);

      const spinDirection = direction === 'left' ? -1 : 1;
      const startRotation = totalSpinRotation.current;
      const targetRotation = startRotation + Math.PI * 2 * spinDirection;
      const startTime = Date.now();
      const duration = 1000; // 1 second spin

      const animateRotation = () => {
        if (!isSpinningRef.current) return;

        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Use easeOutCubic for smooth deceleration
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);

        totalSpinRotation.current =
          startRotation + (targetRotation - startRotation) * easeOutCubic;

        if (progress < 1) {
          requestAnimationFrame(animateRotation);
        } else {
          totalSpinRotation.current = targetRotation;
          isSpinningRef.current = false;
          setIsSpinning(false);
          console.log(
            `Spin completed - final rotation: ${totalSpinRotation.current}`,
          );
        }
      };

      requestAnimationFrame(animateRotation);
    },
    [setIsSpinning],
  );

  // Mouse/touch interaction handlers
  const handlePointerDown = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();

      if (isSpinningRef.current) {
        console.log('Interaction blocked - currently spinning');
        return;
      }

      hasMoved.current = false;

      pointerDownPos.current = {
        x: event.nativeEvent.clientX,
        y: event.nativeEvent.clientY,
      };
      pointerDownTime.current = Date.now();

      // Detect which side of the object was touched for spin direction
      const touchWorldPos = screenToWorld(
        event.nativeEvent.clientX,
        event.nativeEvent.clientY,
      );

      const relativeX = touchWorldPos.x - currentPosition.current.x;
      touchSide.current = relativeX < 0 ? 'left' : 'right';

      setIsDragging(true);

      isDraggingRef.current = true;

      const worldPos = screenToWorld(
        event.nativeEvent.clientX,
        event.nativeEvent.clientY,
      );

      dragOffset.current = {
        x: worldPos.x - currentPosition.current.x,
        y: worldPos.y - currentPosition.current.y,
      };

      document.body.style.cursor = 'grabbing';
    },
    [screenToWorld],
  );

  const handlePointerMove = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current || isSpinningRef.current) return;

      const clientX =
        'clientX' in event ? event.clientX : event.touches[0].clientX;
      const clientY =
        'clientY' in event ? event.clientY : event.touches[0].clientY;

      // Check if pointer has moved significantly
      const deltaX = Math.abs(clientX - pointerDownPos.current.x);
      const deltaY = Math.abs(clientY - pointerDownPos.current.y);
      const moveThreshold = 5;

      if (deltaX > moveThreshold || deltaY > moveThreshold) {
        hasMoved.current = true;
      }

      const worldPos = screenToWorld(clientX, clientY);

      const newX = worldPos.x - dragOffset.current.x;
      const newY = worldPos.y - dragOffset.current.y;

      currentPosition.current.x = newX;
      currentPosition.current.y = newY;
      currentPosition.current.z = 0;

      // Remove all rotation effects during drag
      currentRotation.current.x = 0;
      currentRotation.current.z = 0;
      if (!isSpinning) {
        baseRotationY.current = 0;
      }
    },
    [screenToWorld, isSpinning],
  );

  const handlePointerUp = useCallback(() => {
    const pressDuration = Date.now() - pointerDownTime.current;
    const maxClickDuration = 300;

    const wasClick = !hasMoved.current && pressDuration < maxClickDuration;

    if (wasClick && !isSpinningRef.current) {
      console.log(
        `Click detected on ${touchSide.current} side - triggering spin`,
      );
      triggerSpin(touchSide.current);
    } else if (hasMoved.current) {
      window.sa_event?.(`shirt_dragged`);
    } else {
      console.log('Drag ended - returning to center');
    }

    setIsDragging(false);
    isDraggingRef.current = false;
    document.body.style.cursor = 'auto';

    randomRotationOffset.current = { x: 0, y: 0, z: 0 };

    if (!isSpinningRef.current) {
      api.start({
        targetX: 0,
        targetY: 0,
        targetZ: 0,
      });
    }
  }, [api, triggerSpin]);

  // Global event listeners for drag events
  useEffect(() => {
    const handleMove = (e: Event) =>
      handlePointerMove(e as MouseEvent | TouchEvent);
    const handleUp = () => handlePointerUp();

    if (isDragging) {
      window.addEventListener('pointermove', handleMove);
      window.addEventListener('pointerup', handleUp);
      window.addEventListener('pointercancel', handleUp);

      return () => {
        window.removeEventListener('pointermove', handleMove);
        window.removeEventListener('pointerup', handleUp);
        window.removeEventListener('pointercancel', handleUp);
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleUp);
        window.removeEventListener('touchmove', handleMove);
        window.removeEventListener('touchend', handleUp);
      };
    }
  }, [isDragging, handlePointerMove, handlePointerUp]);

  return {
    // State
    isDragging,
    isSpinning,

    // Refs for direct access
    currentPosition,
    currentRotation,
    baseRotationY,
    totalSpinRotation,

    // Spring values
    targetX,
    targetY,
    targetZ,

    // Handlers
    handlePointerDown,

    // Utility functions
    screenToWorld,
    triggerSpin,
  };
};
