import * as THREE from 'three';

// Animation state types
export interface AnimationState {
  isAnimating: boolean;
  currentOpacity: number;
  isReturning: boolean;
}

// Fade animation parameters
export interface FadeAnimationParams {
  startOpacity: number;
  targetOpacity: number;
  duration: number;
  onComplete?: () => void;
}

// Shirt interaction types
export interface ShirtInteractionState {
  isDragging: boolean;
  isSpinning: boolean;
  currentPosition: THREE.Vector3;
  currentRotation: THREE.Euler;
  baseRotationY: number;
  totalSpinRotation: number;
}

// Pointer interaction types
export interface PointerInteraction {
  isDragging: boolean;
  isSpinning: boolean;
  dragOffset: { x: number; y: number };
  touchSide: 'left' | 'right';
  hasMoved: boolean;
}

// Wiggle configuration for bones
export interface WiggleConfig {
  velocity: number;
  stiffness: number;
  damping: number;
}

// Bone configuration
export interface BoneConfig {
  name: string;
  wiggleConfig?: WiggleConfig;
  skip?: boolean;
}
