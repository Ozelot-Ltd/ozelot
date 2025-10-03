declare global {
  interface Window {
    sa_event?: (eventName: string, data?: Record<string, unknown>) => void;
  }
}

export {};
