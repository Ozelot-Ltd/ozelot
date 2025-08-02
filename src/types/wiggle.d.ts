declare module 'wiggle/rig' {
  import * as THREE from 'three'
  
  /**
   * This utility class creates wiggle bones for a whole Skeleton.
   * It is configured by adding values to the `userData` property of the bones.
   * 
   * 1. Bones that define `userData.wiggleVelocity` are considered wiggle bones.
   * 2. Bones that define `userData.wiggleStiffness` and `userData.wiggleDamping` are considered wiggle springs.
   * 3. Other bones are considered static bones.
   */
  export class WiggleRig {
    /**
     * @param target Reference to the skeleton where the rig will be applied to.
     */
    constructor(target: THREE.Skeleton)
    
    /**
     * Resets all the wiggle bones in this rig to their original transforms relative to their parent.
     */
    reset(): void
    
    /**
     * Animates all the wiggle bones in the rig.
     * @param dt Time delta since the last update. If not provided, this is calculated internally using `performance.now()`
     */
    update(dt?: number): void
    
    /**
     * Removes all the wiggle bones and reverts the hierarchy to the original state.
     */
    dispose(): void
  }
  
  /**
   * Helper class for visualizing WiggleRig
   */
  export class WiggleRigHelper {
    constructor(rig: WiggleRig)
  }
}

declare module 'wiggle/spring' {
  import * as THREE from 'three'
  
  interface WiggleBoneConfig {
    stiffness?: number
    damping?: number
  }
  
  /**
   * Individual wiggle bone implementation for spring-based physics
   */
  export class WiggleBone {
    /**
     * @param bone The bone object to apply wiggle physics to
     * @param config Configuration options for the spring behavior
     */
    constructor(bone: THREE.Bone, config?: WiggleBoneConfig)
    
    /**
     * Updates the wiggle bone simulation
     */
    update(): void
    
    /**
     * Resets the bone to its original position
     */
    reset(): void
    
    /**
     * Disposes of the wiggle bone
     */
    dispose(): void
  }
}

declare module 'wiggle' {
  import * as THREE from 'three'
  
  interface WiggleBoneOptions {
    velocity?: number
    stiffness?: number
    damping?: number
  }
  
  /**
   * Individual wiggle bone implementation
   */
  export class WiggleBone {
    /**
     * @param bone The bone object to apply wiggle physics to
     * @param options Configuration options for the wiggle behavior
     */
    constructor(bone: THREE.Bone, options?: WiggleBoneOptions)
    
    /**
     * Updates the wiggle bone simulation
     * @param dt Time delta since the last update
     */
    update(dt?: number): void
    
    /**
     * Resets the bone to its original position
     */
    reset(): void
    
    /**
     * Disposes of the wiggle bone
     */
    dispose(): void
  }
} 