import { useMemo } from 'react';

function useMultiCheckboxState(
  selectedValues: Array<unknown>,
  allValues: Array<unknown>
): boolean | 'indeterminate' {
  return useMemo(() => {
    if (!selectedValues.length) {
      return false;
    }

    if (selectedValues.length === allValues.length) {
      return true;
    }
    return 'indeterminate';
  }, [selectedValues, allValues]);
}

export default useMultiCheckboxState;
