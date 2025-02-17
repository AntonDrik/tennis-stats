import { RefObject, useEffect } from 'react';

function useScrollMatchIntoView(
  matchId: number | undefined | null,
  containerRef?: RefObject<HTMLElement>
) {
  useEffect(() => {
    if (Number.isFinite(matchId)) {
      const elemId = `match-card-${matchId}`;

      const el = document.getElementById(elemId);
      const offset = el?.getBoundingClientRect();

      if (offset) {
        window.scrollTo({ top: offset.top - 64, behavior: 'smooth' });

        if (containerRef?.current) {
          containerRef.current.scrollTo({ left: offset.left - 64, behavior: 'smooth' });
        }
      }
    }
  }, [matchId]);
}

export default useScrollMatchIntoView;
