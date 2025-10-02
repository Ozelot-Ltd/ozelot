import dynamic from "next/dynamic";

// Conditionally import Perf component only in development
export const PerformanceMonitor = dynamic(
  () => import("r3f-perf").then((module) => module.Perf),
  {
    ssr: false,
  }
);

// Wrapper component that only renders in development
export const DevPerformanceMonitor = () => {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return <PerformanceMonitor position="top-left" />;
};
