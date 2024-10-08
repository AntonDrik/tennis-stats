import { IconButton } from '@radix-ui/themes';
import styled from 'styled-components';

const ScoreItem = styled(IconButton)<{ $isSelected: boolean }>({}, ({ $isSelected }) => ({
  backgroundColor: $isSelected ? 'var(--accent-a8)' : 'var(--accent-a3)',

  '&:hover': {
    backgroundColor: 'var(--accent-a5)',
  },
}));

export default {
  ScoreItem,
};
