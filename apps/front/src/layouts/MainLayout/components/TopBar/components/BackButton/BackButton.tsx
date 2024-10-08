import { Button } from '@radix-ui/themes';
import { useAtomValue } from 'jotai';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '../../../../../../shared/svg-icons';

import { backButtonAtom } from './BackButton.state';

function BackButton() {
  const navigate = useNavigate();

  const state = useAtomValue(backButtonAtom);

  const handleClick = () => {
    if (typeof state?.link === 'function') {
      state.link();
      return;
    }

    navigate(state?.link as string);
  };

  if (!state) {
    return null;
  }

  return (
    <Button variant={'outline'} size={'3'} onClick={handleClick}>
      <ChevronLeftIcon />

      {state.title}
    </Button>
  );
}

export default memo(BackButton);
