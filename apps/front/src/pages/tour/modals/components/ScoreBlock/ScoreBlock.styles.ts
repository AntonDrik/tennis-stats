import styled from 'styled-components';
import { Stack } from '@mui/material';

interface IProps {
  $selected: boolean;
}

const SectionWrapper = styled(Stack)<IProps>(
  {
    borderRadius: 8,
    flex: 1,
    justifyContent: 'space-between',
    padding: '4px 8px 8px 8px',
    transition: 'background-color 0.5s ease-in'
  },
  ({ $selected }) => ({
    backgroundColor: $selected ? '#F4FAFF' : '#FFF',
  })
);

export default {
  SectionWrapper
};
