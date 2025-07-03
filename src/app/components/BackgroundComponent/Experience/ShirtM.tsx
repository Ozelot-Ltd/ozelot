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
import { isClickedStore } from "@/app/stores/IsClickedStore";

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
  const { isClicked } = isClickedStore();
  const [isFlying, setIsFlying] = useState(false);
  const isOffScreen = useRef(false);
  const targetFlyXPosition = useRef(0);
  const targetFlyYPosition = useRef(0);
  const currentFlyXPosition = useRef(0);
  const currentFlyYPosition = useRef(0);
  const flyDirection = useRef<"left" | "right" | "up" | "none">("none");
  const previousDirection = useRef<"left" | "right" | "up" | "none">("none");
  const flyRotationStart = useRef(0);
  const currentFlyRotation = useRef(0);

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
  const timeOffset = useRef(Math.random() * 1000); // Random seed for consistent randomness

  // Click/tap detection
  const pointerDownPos = useRef({ x: 0, y: 0 });
  const pointerDownTime = useRef(0);
  const hasMoved = useRef(false);
  const touchSide = useRef<"left" | "right">("right");

  // Get viewport for proper coordinate conversion
  const { viewport } = useThree();

  // React Spring for return-to-center animation only (no spinning)
  const [{ targetX, targetY, targetZ, targetRotX, targetRotZ }, api] =
    useSpring(() => ({
      targetX: 0,
      targetY: 0,
      targetZ: 0,
      targetRotX: 0,
      targetRotZ: 0,
      config: {
        mass: 1,
        tension: 170,
        friction: 26,
      },
    }));

  // Handle isClicked changes with directional fly animation and page transition tracking
  useEffect(() => {
    if (isClicked && isClicked !== "") {
      // Determine fly direction based on page
      let direction: "left" | "right" | "up" = "up";
      if (isClicked === "projects" || isClicked === "studio") {
        direction = "right";
      } else if (isClicked === "records" || isClicked === "contact") {
        direction = "left";
      } else if (isClicked === "services") {
        direction = "up";
      }

      // If already off-screen and switching to a different direction, fly directly across screen
      if (
        isOffScreen.current &&
        previousDirection.current !== "none" &&
        previousDirection.current !== direction
      ) {
        console.log(
          `🔄 Direct cross-screen flight: ${previousDirection.current} → ${direction}`
        );

        const startX = currentFlyXPosition.current;
        const startY = currentFlyYPosition.current;
        let endX = 0;
        let endY = 0;

        // Set target positions based on NEW direction
        if (direction === "left") {
          endX = -6; // Fly to left off-screen
          endY = 0;
        } else if (direction === "right") {
          endX = 6; // Fly to right off-screen
          endY = 0;
        } else if (direction === "up") {
          endX = 0;
          endY = 4; // Fly to up off-screen
        }

        flyDirection.current = direction;
        previousDirection.current = direction; // Update tracking

        // Set up rotation for Y-axis movements
        const includesSpin =
          direction === "up" || previousDirection.current === "up";
        const rotationStart = totalSpinRotation.current;
        const rotationEnd = includesSpin
          ? rotationStart + Math.PI * 2
          : rotationStart; // 360 degrees for Y movements
        flyRotationStart.current = rotationStart;

        const startTime = Date.now();
        const duration = includesSpin ? 1600 : 1200; // Longer duration for spinning transitions

        const animateCrossFlight = () => {
          if (!isOffScreen.current) return; // Animation was cancelled

          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Use easeInOutCubic for smooth cross-screen motion
          const easeInOutCubic =
            progress < 0.5
              ? 4 * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;

          currentFlyXPosition.current =
            startX + (endX - startX) * easeInOutCubic;
          currentFlyYPosition.current =
            startY + (endY - startY) * easeInOutCubic;
          targetFlyXPosition.current = currentFlyXPosition.current;
          targetFlyYPosition.current = currentFlyYPosition.current;

          // Add rotation for Y-axis movements
          if (includesSpin) {
            const rotationProgress = easeInOutCubic; // Use same easing for rotation
            currentFlyRotation.current =
              rotationStart + (rotationEnd - rotationStart) * rotationProgress;
            totalSpinRotation.current = currentFlyRotation.current;
          }

          if (progress < 1) {
            requestAnimationFrame(animateCrossFlight);
          } else {
            console.log(
              `Cross-screen flight completed: now at ${direction}${includesSpin ? " (with 360° spin)" : ""}`
            );
          }
        };

        requestAnimationFrame(animateCrossFlight);
        return;
      }

      // If not off-screen or same direction, fly out normally
      if (!isOffScreen.current) {
        flyOutInDirection(direction);
      }

      function flyOutInDirection(dir: "left" | "right" | "up") {
        flyDirection.current = dir;
        previousDirection.current = dir; // Track where we're going
        console.log(
          `✅ Triggering ${dir} fly-off animation for ${isClicked}${dir === "up" ? " (with 360° spin)" : ""}`
        );
        setIsFlying(true);
        isOffScreen.current = true;

        const startX = currentFlyXPosition.current;
        const startY = currentFlyYPosition.current;
        let endX = 0;
        let endY = 0;

        // Set target positions based on direction
        if (dir === "left") {
          endX = -6; // Fly left off-screen
          endY = 0;
        } else if (dir === "right") {
          endX = 6; // Fly right off-screen
          endY = 0;
        } else if (dir === "up") {
          endX = 0;
          endY = 4; // Fly up off-screen
        }

        // Set up rotation for Y-axis movement (up)
        const includesSpin = dir === "up";
        const rotationStart = totalSpinRotation.current;
        const rotationEnd = includesSpin
          ? rotationStart + Math.PI * 2
          : rotationStart; // 360 degrees for up movement
        flyRotationStart.current = rotationStart;

        const startTime = Date.now();
        const duration = includesSpin ? 1800 : 1600; // Longer duration for spinning fly-off

        const animateFlyOff = () => {
          if (!isOffScreen.current) return; // Animation was cancelled

          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Use easeOutQuart for dramatic launch
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);

          currentFlyXPosition.current = startX + (endX - startX) * easeOutQuart;
          currentFlyYPosition.current = startY + (endY - startY) * easeOutQuart;
          targetFlyXPosition.current = currentFlyXPosition.current;
          targetFlyYPosition.current = currentFlyYPosition.current;

          // Add rotation for Y-axis movement
          if (includesSpin) {
            const rotationProgress = easeOutQuart; // Use same easing for rotation
            currentFlyRotation.current =
              rotationStart + (rotationEnd - rotationStart) * rotationProgress;
            totalSpinRotation.current = currentFlyRotation.current;
          }

          if (progress < 1) {
            requestAnimationFrame(animateFlyOff);
          } else {
            // Stay off-screen - don't reset any flags
            console.log(
              `${dir} fly-off completed - staying off-screen${includesSpin ? " (with 360° spin)" : ""}`
            );
          }
        };

        requestAnimationFrame(animateFlyOff);
      }
    } else {
      // Return to home - come back from the direction we last flew to
      if (!isOffScreen.current) return; // Already on-screen

      const returnDirection = previousDirection.current;
      const includesReturnSpin = returnDirection === "up";
      console.log(
        `✅ Returning to home from ${returnDirection} direction${includesReturnSpin ? " (with 360° spin)" : ""}`
      );

      const startX = currentFlyXPosition.current;
      const startY = currentFlyYPosition.current;
      const endX = 0;
      const endY = 0;

      // Set up rotation for return from Y-axis (up)
      const rotationStart = totalSpinRotation.current;
      const rotationEnd = includesReturnSpin
        ? rotationStart + Math.PI * 2
        : rotationStart; // 360 degrees for return from up
      flyRotationStart.current = rotationStart;

      const startTime = Date.now();
      const duration = includesReturnSpin ? 1800 : 1500; // Longer duration for spinning return

      const animateReturn = () => {
        if (
          isOffScreen.current === false &&
          Math.abs(currentFlyXPosition.current) <= 0.1 &&
          Math.abs(currentFlyYPosition.current) <= 0.1
        )
          return; // Animation complete

        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Use easeOutCubic for gentle landing
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);

        currentFlyXPosition.current = startX + (endX - startX) * easeOutCubic;
        currentFlyYPosition.current = startY + (endY - startY) * easeOutCubic;
        targetFlyXPosition.current = currentFlyXPosition.current;
        targetFlyYPosition.current = currentFlyYPosition.current;

        // Add rotation for return from Y-axis movement
        if (includesReturnSpin) {
          const rotationProgress = easeOutCubic; // Use same easing for rotation
          currentFlyRotation.current =
            rotationStart + (rotationEnd - rotationStart) * rotationProgress;
          totalSpinRotation.current = currentFlyRotation.current;
        }

        if (progress < 1) {
          requestAnimationFrame(animateReturn);
        } else {
          // Animation complete - reset all flags
          currentFlyXPosition.current = 0;
          currentFlyYPosition.current = 0;
          targetFlyXPosition.current = 0;
          targetFlyYPosition.current = 0;
          isOffScreen.current = false;
          setIsFlying(false);
          flyDirection.current = "none";
          previousDirection.current = "none"; // Reset previous direction
          console.log(
            `Return completed - ready for next interaction${includesReturnSpin ? " (with 360° spin)" : ""}`
          );
        }
      };

      requestAnimationFrame(animateReturn);
    }
  }, [isClicked]);

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
      if (isSpinningRef.current) return;

      // Record pointer down position and time for click detection
      pointerDownPos.current = {
        x: event.nativeEvent.clientX,
        y: event.nativeEvent.clientY,
      };
      pointerDownTime.current = Date.now();
      hasMoved.current = false;

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
      if (!isDraggingRef.current) return;

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

      // Calculate natural rotation with random components
      const tiltStrength = 0.3;
      const baseRotationZ = -currentPosition.current.x * tiltStrength;
      const baseRotationX = currentPosition.current.y * tiltStrength * 0.5;

      // Calculate distance from center for random rotation scaling
      const distanceFromCenter = Math.sqrt(
        currentPosition.current.x * currentPosition.current.x +
          currentPosition.current.y * currentPosition.current.y
      );
      const normalizedDistance = Math.min(
        distanceFromCenter / (viewport.width / 2),
        1
      ); // Normalize based on viewport width

      // Generate smooth random rotation that changes over time
      const time = Date.now() * 0.001 + timeOffset.current;
      const randomStrength = normalizedDistance * 0.4; // Scale random rotation with distance

      randomRotationOffset.current.x =
        Math.sin(time * 1.3 + currentPosition.current.x) * randomStrength;
      randomRotationOffset.current.y =
        Math.cos(time * 0.8 + currentPosition.current.y) * randomStrength * 0.5;
      randomRotationOffset.current.z =
        Math.sin(time * 1.7 + distanceFromCenter) * randomStrength * 0.8;

      // Combine base rotation with random offset
      currentRotation.current.z =
        baseRotationZ + randomRotationOffset.current.z;
      currentRotation.current.x =
        baseRotationX + randomRotationOffset.current.x;

      // Store base Y rotation separately (don't interfere with spinning)
      if (!isSpinning) {
        baseRotationY.current = randomRotationOffset.current.y;
      }
    },
    [screenToWorld, isSpinning, viewport]
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
        targetRotX: 0,
        targetRotZ: 0,
      });
    }
  }, [api, triggerSpin]);

  // Global event listeners for drag events
  useEffect(() => {
    if (isDragging) {
      const handleMove = (e: Event) =>
        handlePointerMove(e as MouseEvent | TouchEvent);
      const handleUp = () => handlePointerUp();

      window.addEventListener("pointermove", handleMove);
      window.addEventListener("pointerup", handleUp);
      window.addEventListener("pointercancel", handleUp);
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleUp);
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("touchend", handleUp);

      return () => {
        window.removeEventListener("pointermove", handleMove);
        window.removeEventListener("pointerup", handleUp);
        window.removeEventListener("pointercancel", handleUp);
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseup", handleUp);
        window.removeEventListener("touchmove", handleMove);
        window.removeEventListener("touchend", handleUp);
      };
    }
  }, [isDragging, handlePointerMove, handlePointerUp]);

  useFrame((_, delta) => {
    if (wiggleRigRef.current) {
      // Smooth wiggle update with enhanced intensity during drag, spin, or flying
      // Extra intensity for dramatic fly animations
      let wiggleIntensity = 1.0;
      if (isDragging) {
        wiggleIntensity = 1.3; // Dragging intensity
      } else if (isSpinning) {
        wiggleIntensity = 1.4; // Spinning intensity
      } else if (isFlying) {
        wiggleIntensity = 1.8; // Maximum intensity for fly animations
      }

      wiggleRigRef.current.update(delta * wiggleIntensity);
    }

    // Direct fly position update (no interpolation needed - already smooth from animation)
    const currentFlyX = currentFlyXPosition.current;
    const currentFlyY = currentFlyYPosition.current;

    if (groupRef.current) {
      if (isDragging && !isSpinning) {
        // Direct position/rotation update during drag for 60fps performance
        groupRef.current.position.set(
          currentPosition.current.x + currentFlyX,
          currentPosition.current.y + currentFlyY,
          currentPosition.current.z
        );
        groupRef.current.rotation.set(
          currentRotation.current.x,
          baseRotationY.current + totalSpinRotation.current,
          currentRotation.current.z
        );
      } else {
        // Smooth spring interpolation when returning to center or spinning
        const springX = targetX.get();
        const springY = targetY.get();
        const springZ = targetZ.get();
        const springRotX = targetRotX.get();
        const springRotZ = targetRotZ.get();

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

          currentRotation.current.x = THREE.MathUtils.lerp(
            currentRotation.current.x,
            springRotX,
            delta * lerpSpeed
          );
          currentRotation.current.z = THREE.MathUtils.lerp(
            currentRotation.current.z,
            springRotZ,
            delta * lerpSpeed
          );
        }

        groupRef.current.position.set(
          currentPosition.current.x + currentFlyX,
          currentPosition.current.y + currentFlyY,
          currentPosition.current.z
        );
        groupRef.current.rotation.set(
          currentRotation.current.x,
          baseRotationY.current + totalSpinRotation.current,
          currentRotation.current.z
        );
      }
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
