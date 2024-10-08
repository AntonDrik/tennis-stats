import { Table } from '@radix-ui/themes';
import styled from 'styled-components';

const Row = styled(Table.Row)({
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: 'var(--accent-2)',
  },
});

export default {
  Row,
};
