"use client";

import { Experience } from "./Experience/Experience";

export const BackgroundComponent = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "auto", // Allow pointer events for the 3D scene
      }}
    >
      <Experience />
    </div>
  );
};
