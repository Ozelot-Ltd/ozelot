# 3D Scene Refactoring

This document outlines the refactoring of the 3D scene components for better maintainability, performance, and code organization.

## Structure Overview

```
src/
├── app/
│   ├── hooks/               # Existing project hooks directory
│   │   ├── useShuffleConfig.ts
│   │   ├── useFadeAnimation.ts      # Moved here
│   │   └── useShirtInteraction.ts   # Moved here
│   └── components/
│       └── BackgroundComponent/
│           └── Experience/
│               ├── components/           # Reusable 3D components
│               │   ├── LightingSetup.tsx
│               │   ├── SparklesSetup.tsx
│               │   ├── StudioEnvironment.tsx
│               │   ├── PerformanceMonitor.tsx
│               │   └── ShirtM.tsx
│               ├── config/              # Configuration files (kept inside for easy access)
│               │   ├── sceneConfig.ts
│               │   ├── lightingConfig.ts
│               │   ├── sparklesConfig.ts
│               │   └── environmentConfig.ts
│               ├── Experience.tsx       # Main scene component
│               └── README.md           # This file
└── types/                   # Existing project types directory
    ├── wiggle.d.ts
    └── index.ts             # Moved here
```

## Key Improvements

### 1. **Separation of Concerns**

- **Components**: Each component has a single responsibility
- **Configuration**: All constants and settings are centralized
- **Hooks**: Reusable logic is extracted into custom hooks
- **Types**: TypeScript interfaces for better type safety

### 2. **Performance Optimizations**

- **Custom Animation Hook**: Pure JavaScript animations for maximum performance
- **Optimized Lighting**: Centralized lighting configuration
- **Efficient Sparkles**: Reusable sparkles component with configurable parameters
- **Memory Management**: Proper cleanup of animations and resources

### 3. **Maintainability**

- **Configuration Files**: Easy to modify scene parameters without touching component logic
- **Modular Components**: Each component can be tested and modified independently
- **Type Safety**: Comprehensive TypeScript interfaces prevent runtime errors
- **Clear Structure**: Logical file organization makes the codebase easier to navigate

### 4. **Reusability**

- **Custom Hooks**: Animation and interaction logic can be reused across the entire project
- **Shared Types**: TypeScript interfaces are available to all components in the project
- **Configurable Components**: Components accept props for different use cases
- **Environment Setup**: Studio environment can be easily modified or replaced
- **Modular Structure**: Hooks and types are outside the Experience folder for broader accessibility

## Component Details

### LightingSetup

- Centralized lighting configuration
- 5-point lighting system (ambient, hemisphere, key, fill, rim, hair)
- Shadow mapping configuration
- Easy to modify lighting parameters

### SparklesSetup

- Configurable sparkles for different effects
- Supports both shirt and background sparkles
- Centralized configuration for easy tweaking

### StudioEnvironment

- Deterministic studio reflection environment
- Configurable lightformers
- Optimized for performance with low resolution

### ShirtM

- Refactored interaction logic using custom hook
- Optimized wiggle configuration
- Clean separation of concerns

### PerformanceMonitor

- Development-only performance monitoring
- Dynamic import for production builds
- Clean integration with the scene

## Configuration Files

### sceneConfig.ts

- Scene background and fog settings
- Camera configuration
- Canvas settings
- Animation timing constants
- Shirt positioning and scaling

### lightingConfig.ts

- Complete lighting setup configuration
- Shadow mapping parameters
- Color and intensity settings

### sparklesConfig.ts

- Sparkles parameters for different effects
- Count, size, speed, and positioning
- Color and opacity settings

### environmentConfig.ts

- Studio environment lighting
- Lightformer configurations
- Resolution and frame settings

## Custom Hooks

### useFadeAnimation

- Pure JavaScript animation system
- Easing functions for smooth transitions
- Memory-efficient with proper cleanup
- Reusable across different components

### useShirtInteraction

- Complete interaction logic for the shirt
- Drag and drop functionality
- Spin animations
- Touch and mouse support
- Spring-based return animations

## Benefits

1. **Easier Maintenance**: Changes to lighting, animations, or interactions can be made in dedicated files
2. **Better Performance**: Optimized animations and proper resource management
3. **Type Safety**: Comprehensive TypeScript interfaces prevent runtime errors
4. **Reusability**: Components and hooks can be used in other parts of the application
5. **Testability**: Smaller, focused components are easier to test
6. **Scalability**: New features can be added without affecting existing code
7. **Improved Organization**: Hooks and types are accessible across the entire project
8. **Easy Configuration**: Config files remain close to components for quick access and modifications

## Usage

The refactored components maintain the same API as before, so no changes are needed in the parent components. The refactoring is purely internal and improves the codebase structure without breaking existing functionality.
