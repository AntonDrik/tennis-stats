import { Stack } from '@mui/material';
import styled from 'styled-components';

const Wrapper = styled(Stack)({
  padding: '12px 18px',
  backgroundColor: '#F7F9F8',
  borderRadius: '12px',
  marginBottom: 12
});

const List = styled(Stack)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
});


export default {
  Wrapper,
  List
};
