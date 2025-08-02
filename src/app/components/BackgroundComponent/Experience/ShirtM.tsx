import { useFrame, useGraph, useThree } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState, useCallback } from "react";
import { WiggleRig } from "wiggle/rig";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";
import React from "react";
import type { GLTF } from "three-stdlib";
import { useSpring } from "@react-spring/core";

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Object3D>;
  materials: Record<string, THREE.Material>;
};

export const ShirtM = () => {
  const { scene } = useGLTF("/models/ShirtT-transformed.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone) as unknown as GLTFResult;
  const groupRef = useRef<THREE.Group>(null);
  const wiggleRigRef = useRef<WiggleRig | null>(null);

  // Interaction state
  const [isDragging, setIsDragging] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const isDraggingRef = useRef(false);
  const isSpinningRef = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0, z: 0 });
  const currentRotation = useRef({ x: 0, y: 0, z: 0 });
  const baseRotationY = useRef(0); // Separate base Y rotation for dragging effects
  const totalSpinRotation = useRef(0); // Accumulated spin rotation (no spring physics)
  const randomRotationOffset = useRef({ x: 0, y: 0, z: 0 });

  // Initialize refs to ensure consistent behavior
  useEffect(() => {
    // Reset all interaction state on component mount
    isDraggingRef.current = false;
    isSpinningRef.current = false;
    currentPosition.current = { x: 0, y: 0, z: 0 };
    currentRotation.current = { x: 0, y: 0, z: 0 };
    baseRotationY.current = 0;
    totalSpinRotation.current = 0;
    randomRotationOffset.current = { x: 0, y: 0, z: 0 };
  }, []);

  // Click/tap detection
  const pointerDownPos = useRef({ x: 0, y: 0 });
  const pointerDownTime = useRef(0);
  const hasMoved = useRef(false);
  const touchSide = useRef<"left" | "right">("right");

  // Get viewport for proper coordinate conversion
  const { viewport } = useThree();

  // React Spring for return-to-center animation only (no spinning)
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

  useEffect(() => {
    if (!groupRef.current) return;

    // Find SkinnedMesh
    let skinnedMesh: THREE.SkinnedMesh | null = null;
    skinnedMesh = groupRef.current.getObjectByName(
      "Shirt"
    ) as THREE.SkinnedMesh;

    if (!skinnedMesh) {
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.SkinnedMesh && !skinnedMesh) {
          skinnedMesh = child;
        }
      });
    }

    if (!skinnedMesh || !skinnedMesh.skeleton) {
      console.warn("No SkinnedMesh or skeleton found");
      return;
    }

    console.log(
      "Found skeleton with",
      skinnedMesh.skeleton.bones.length,
      "bones"
    );

    // Configure wiggle parameters on bones for optimal performance
    const bones = skinnedMesh.skeleton.bones;
    bones.forEach((bone, index) => {
      // Skip the root bone and primary shoulder bones
      if (
        bone.name === "Root" ||
        bone.name === "Shoulder_1" ||
        bone.name === "Shoulder_2" ||
        index === 0
      ) {
        return;
      }

      // Optimized wiggle settings for 60fps
      bone.userData.wiggleVelocity = 0.12;

      if (
        bone.name === "Spine 1" ||
        bone.name === "Spine 2" ||
        bone.name === "Spine 3"
      ) {
        bone.userData.wiggleStiffness = 0.15;
        bone.userData.wiggleDamping = 0.15;
      } else if (bone.name === "Arm 1" || bone.name === "Arm 2") {
        bone.userData.wiggleStiffness = 0.15;
        bone.userData.wiggleDamping = 0.15;
        bone.userData.wiggleVelocity = 0.15;
      } else if (
        bone.name === "Arm 1_end" ||
        bone.name === "Arm 2_end" ||
        bone.name === "Spine 3_end"
      ) {
        bone.userData.wiggleStiffness = 0.95;
        bone.userData.wiggleDamping = 0.75;
        bone.userData.wiggleVelocity = 0.25;
      } else {
        bone.userData.wiggleStiffness = 0.2;
        bone.userData.wiggleDamping = 0.85;
      }
    });

    try {
      wiggleRigRef.current = new WiggleRig(skinnedMesh.skeleton);
      console.log("WiggleRig created successfully");
    } catch (error) {
      console.error("Failed to create WiggleRig:", error);
    }

    return () => {
      if (wiggleRigRef.current) {
        wiggleRigRef.current.dispose();
      }
    };
  }, [nodes]);

  // Convert screen coordinates to world coordinates
  const screenToWorld = useCallback(
    (clientX: number, clientY: number) => {
      const rect = document.querySelector("canvas")?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };

      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((clientY - rect.top) / rect.height) * 2 + 1;

      return {
        x: x * (viewport.width / 2),
        y: y * (viewport.height / 2),
      };
    },
    [viewport]
  );

  // Trigger 360-degree spin animation based on direction (direct rotation, no spring)
  const triggerSpin = useCallback(
    (direction: "left" | "right") => {
      if (isSpinningRef.current) {
        console.log("Spin blocked - already spinning");
        return; // Prevent multiple spins
      }

      // Immediately cancel any dragging that might be in progress
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
      }

      console.log(`✅ Triggering 360-degree spin ${direction}`);
      isSpinningRef.current = true; // Set immediately to prevent double-clicks
      setIsSpinning(true);

      const spinDirection = direction === "left" ? -1 : 1; // Left = counter-clockwise, Right = clockwise
      const startRotation = totalSpinRotation.current;
      const targetRotation = startRotation + Math.PI * 2 * spinDirection; // 360 degrees in radians
      const startTime = Date.now();
      const duration = 1000; // 1 second spin

      console.log(`Starting direct spin: ${startRotation} → ${targetRotation}`);

      const animateRotation = () => {
        if (!isSpinningRef.current) return; // Animation was cancelled

        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Use easeOutCubic for smooth deceleration
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);

        totalSpinRotation.current =
          startRotation + (targetRotation - startRotation) * easeOutCubic;

        if (progress < 1) {
          requestAnimationFrame(animateRotation);
        } else {
          // Animation complete - reset state immediately
          totalSpinRotation.current = targetRotation;
          isSpinningRef.current = false; // Reset immediately for instant responsiveness
          setIsSpinning(false);
          console.log(
            `Spin completed - final rotation: ${totalSpinRotation.current} - Ready for next spin!`
          );
        }
      };

      requestAnimationFrame(animateRotation);
    },
    [setIsSpinning]
  );

  // Mouse/touch interaction handlers
  const handlePointerDown = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();

      // Don't start new interactions while spinning
      if (isSpinningRef.current) {
        console.log("Interaction blocked - currently spinning");
        return;
      }

      // Reset movement detection for new interaction
      hasMoved.current = false;

      // Record pointer down position and time for click detection
      pointerDownPos.current = {
        x: event.nativeEvent.clientX,
        y: event.nativeEvent.clientY,
      };
      pointerDownTime.current = Date.now();

      // Detect which side of the object was touched for spin direction
      const touchWorldPos = screenToWorld(
        event.nativeEvent.clientX,
        event.nativeEvent.clientY
      );

      // Determine side based on world position relative to object center
      // Account for current object position
      const relativeX = touchWorldPos.x - currentPosition.current.x;
      touchSide.current = relativeX < 0 ? "left" : "right";

      setIsDragging(true);
      isDraggingRef.current = true;

      const worldPos = screenToWorld(
        event.nativeEvent.clientX,
        event.nativeEvent.clientY
      );

      // Calculate offset from current position
      dragOffset.current = {
        x: worldPos.x - currentPosition.current.x,
        y: worldPos.y - currentPosition.current.y,
      };

      document.body.style.cursor = "grabbing";
    },
    [screenToWorld]
  );

  const handlePointerMove = useCallback(
    (event: MouseEvent | TouchEvent) => {
      // Early return if not dragging or if spinning
      if (!isDraggingRef.current || isSpinningRef.current) return;

      const clientX =
        "clientX" in event ? event.clientX : event.touches[0].clientX;
      const clientY =
        "clientY" in event ? event.clientY : event.touches[0].clientY;

      // Check if pointer has moved significantly (for click detection)
      const deltaX = Math.abs(clientX - pointerDownPos.current.x);
      const deltaY = Math.abs(clientY - pointerDownPos.current.y);
      const moveThreshold = 5; // pixels

      if (deltaX > moveThreshold || deltaY > moveThreshold) {
        hasMoved.current = true;
      }

      const worldPos = screenToWorld(clientX, clientY);

      // Update position immediately for 60fps response
      const newX = worldPos.x - dragOffset.current.x;
      const newY = worldPos.y - dragOffset.current.y;

      // Allow movement anywhere on screen (no constraints)
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
    [screenToWorld, isSpinning]
  );

  const handlePointerUp = useCallback(() => {
    const pressDuration = Date.now() - pointerDownTime.current;
    const maxClickDuration = 300; // milliseconds

    // Check if this was a click (short duration + minimal movement)
    const wasClick = !hasMoved.current && pressDuration < maxClickDuration;

    if (wasClick && !isSpinningRef.current) {
      console.log(
        `Click detected on ${touchSide.current} side - triggering spin`
      );
      triggerSpin(touchSide.current);
    } else {
      console.log("Drag ended - returning to center");
    }

    // Always reset dragging state
    setIsDragging(false);
    isDraggingRef.current = false;
    document.body.style.cursor = "auto";

    // Reset random rotation offsets for smooth return
    randomRotationOffset.current = { x: 0, y: 0, z: 0 };

    // Only trigger return-to-center if not spinning
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
      // Use only pointer events for modern browsers
      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerup", handleUp);
      window.addEventListener("pointercancel", handleUp);

      // Fallback for older browsers (not needed for most modern browsers)
      // window.addEventListener("mousemove", handleMove);
      // window.addEventListener("mouseup", handleUp);
      // window.addEventListener("touchmove", handleMove);
      // window.addEventListener("touchend", handleUp);

      return () => {
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", handleUp);
        window.removeEventListener("pointercancel", handleUp);

        // Also remove fallbacks just in case they were added before
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseup", handleUp);
        window.removeEventListener("touchmove", handleMove);
        window.removeEventListener("touchend", handleUp);
      };
    }
  }, [isDragging, handlePointerMove, handlePointerUp]);

  useFrame((_, delta) => {
    if (wiggleRigRef.current) {
      // Smooth wiggle update with enhanced intensity during drag or spin
      let wiggleIntensity = 1.0;
      if (isDragging) {
        wiggleIntensity = 1.3; // Dragging intensity
      } else if (isSpinning) {
        wiggleIntensity = 1.4; // Spinning intensity
      }
      wiggleRigRef.current.update(delta * wiggleIntensity);
    }

    if (groupRef.current) {
      // Apply position and rotation based on current state
      if (isDragging && !isSpinning) {
        // Direct position update during drag for 60fps performance
        groupRef.current.position.set(
          currentPosition.current.x,
          currentPosition.current.y,
          currentPosition.current.z
        );
      } else {
        // Smooth spring interpolation when returning to center or spinning
        const springX = targetX.get();
        const springY = targetY.get();
        const springZ = targetZ.get();

        // Lerp current position to spring target for smooth transition
        const lerpSpeed = isSpinning ? 4 : 8; // Slower lerp during spin

        if (!isSpinning) {
          // Only lerp position when not spinning
          currentPosition.current.x = THREE.MathUtils.lerp(
            currentPosition.current.x,
            springX,
            delta * lerpSpeed
          );
          currentPosition.current.y = THREE.MathUtils.lerp(
            currentPosition.current.y,
            springY,
            delta * lerpSpeed
          );
          currentPosition.current.z = THREE.MathUtils.lerp(
            currentPosition.current.z,
            springZ,
            delta * lerpSpeed
          );
        }

        // Apply the current position
        groupRef.current.position.set(
          currentPosition.current.x,
          currentPosition.current.y,
          currentPosition.current.z
        );
      }

      // Always apply rotation (separate from position)
      groupRef.current.rotation.set(
        0,
        baseRotationY.current + totalSpinRotation.current,
        0
      );
    }
  });

  return (
    <group ref={groupRef} scale={0.5} onPointerDown={handlePointerDown}>
      <group>
        <primitive object={nodes.Root || Object.values(nodes)[0]} />
        {/* Render the SkinnedMesh properly */}
        {Object.entries(nodes).map(([name, node]) => {
          if (node instanceof THREE.SkinnedMesh) {
            return (
              <skinnedMesh
                key={name}
                geometry={node.geometry}
                material={node.material}
                skeleton={node.skeleton}
                castShadow
                receiveShadow
              />
            );
          }
          return null;
        })}
      </group>
    </group>
  );
};
