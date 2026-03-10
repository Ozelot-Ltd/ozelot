import { useEffect, RefObject } from 'react';

export default function useSmoothScroll(
  containerRef: RefObject<HTMLElement | null>,
  { lerp = 0.08, wheelMultiplier = 1, enabled = true } = {}
) {
  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container) return;

    // Find the actual scroll parent (.section in MainComponent)
    const scroller =
      container.closest('[data-content]')?.parentElement as HTMLElement | null;
    if (!scroller) return;

    let targetScroll = scroller.scrollTop;
    let currentScroll = scroller.scrollTop;
    let animationId: number;
    let isRunning = false;

    const animate = () => {
      currentScroll += (targetScroll - currentScroll) * lerp;

      // Stop when close enough
      if (Math.abs(targetScroll - currentScroll) < 0.5) {
        currentScroll = targetScroll;
        scroller.scrollTop = currentScroll;
        isRunning = false;
        return;
      }

      scroller.scrollTop = currentScroll;
      animationId = requestAnimationFrame(animate);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetScroll = Math.max(
        0,
        Math.min(
          targetScroll + e.deltaY * wheelMultiplier,
          scroller.scrollHeight - scroller.clientHeight
        )
      );

      if (!isRunning) {
        isRunning = true;
        animationId = requestAnimationFrame(animate);
      }
    };

    // Sync if user scrolls via other means (scrollbar drag, touch)
    const onScroll = () => {
      if (!isRunning) {
        targetScroll = scroller.scrollTop;
        currentScroll = scroller.scrollTop;
      }
    };

    scroller.addEventListener('wheel', onWheel, { passive: false });
    scroller.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      scroller.removeEventListener('wheel', onWheel);
      scroller.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationId);
    };
  }, [containerRef, lerp, wheelMultiplier, enabled]);
}
