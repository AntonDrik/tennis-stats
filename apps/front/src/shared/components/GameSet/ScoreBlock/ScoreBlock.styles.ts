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
    padding: '4px 8px 8px 8px'
  },
  ({ $selected }) => ({
    backgroundColor: $selected ? '#F4FAFF' : 'inherit',
    boxShadow: $selected ? 'rgba(3, 102, 214, 0.3) 0px 0px 0px 3px' : 'none'
  })
);



export default {
  SectionWrapper
};
