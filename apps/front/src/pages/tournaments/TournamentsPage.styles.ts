import styled from 'styled-components';

const Grid = styled('div')({
  display: 'grid',
  gap: 16,
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
});

export default {
  Grid,
};
