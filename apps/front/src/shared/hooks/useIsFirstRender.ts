import { useRef } from 'react';

function useIsFirstRender() {
  const renderRef = useRef(true);

  if (renderRef.current) {
    renderRef.current = false;

    return true;
  }

  return renderRef.current;
}

export default useIsFirstRender;
