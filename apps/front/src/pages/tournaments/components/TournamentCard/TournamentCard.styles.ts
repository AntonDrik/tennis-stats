import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import styled from 'styled-components';

const Card = styled('div')({
  width: '100%',
  aspectRatio: '1 / 1',
  borderRadius: '12px',
  cursor: 'pointer',
  backgroundColor: '#ACD8FC',
  border: '1px solid #5EB1EF',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',

  '&:hover': {
    backgroundColor: '#8EC8F6',
  },
});

const CardContent = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',

  width: '100%',
  height: '100%',

  padding: '6px',
});

const CardHeader = styled(Box)({
  position: 'relative',
  width: '100%',
  textAlign: 'center',

  paddingBottom: 6,
  borderBottom: '1px solid #5EB1EF',
});

const EditButton = styled(IconButton)({
  position: 'absolute',
  right: 5,
  top: '50%',
  transform: 'translateY(-50%)',
});

export default { Card, CardContent, CardHeader, EditButton };
