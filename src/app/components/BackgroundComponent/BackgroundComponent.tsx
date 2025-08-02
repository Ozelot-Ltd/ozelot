"use client";

// import { Experience } from "./Experience/Experience";
import { ExperienceAlt } from "./Experience/ExperienceAlt";

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
      {/* Original component with movement animation */}
      {/* <Experience /> */}

      {/* Alternative component with fade animation */}
      <ExperienceAlt />
    </div>
  );
};
