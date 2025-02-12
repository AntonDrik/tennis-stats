import { RefObject, useEffect, useLayoutEffect, useState } from 'react';
import { IDimensions, IExtendedDimensions, IPaddings } from '../types/Dimensions';

type TTarget = RefObject<HTMLDivElement>;

function useDimensions(targetRef: TTarget): IDimensions;
function useDimensions(targetRef: TTarget, paddings: IPaddings): IExtendedDimensions;
function useDimensions(
  targetRef: TTarget,
  paddings?: IPaddings
): IDimensions | IExtendedDimensions {
  const getDimensions = () => {
    return {
      width: targetRef.current ? targetRef.current.offsetWidth : 0,
      height: targetRef.current ? targetRef.current.offsetHeight : 0,
    };
  };

  const [dimensions, setDimensions] = useState(getDimensions());

  const handleResize = () => setDimensions(getDimensions());

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(handleResize, []);

  return {
    handleResize,
    fullWidth: dimensions.width,
    fullHeight: dimensions.height,
    boundsWidth: dimensions.width - (paddings?.right ?? 0) - (paddings?.left ?? 0),
    boundsHeight: dimensions.height - (paddings?.top ?? 0) - (paddings?.bottom ?? 0),
  };
}

export default useDimensions;
