import styled from 'styled-components'


const blue = {
    100: '#daecff',
    200: '#b6daff',
    300: '#66b2ff',
    400: '#3399ff',
    500: '#007fff',
    600: '#0072e5',
    700: '#0059B2',
    800: '#004c99',
}

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
}

const StyledInputRoot = styled('div')`
  font-weight: 400;
  color: ${grey[500]};
  display: flex;
  flex-flow: column-reverse nowrap;
  gap: 12px;
  justify-content: center;
  align-items: center;
`


const StyledInput = styled('input')`
  font-size: 3rem;
  font-weight: 400;
  line-height: 1.375;
  color: ${grey[900]};
  background: #fff;
  border: 1px solid ${grey[200]};
  box-shadow: 0px 2px 4px rgba(0,0,0, 0.05);
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 5rem;
  height: 7rem;
  text-align: center;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${blue[200]};
  }

  &:focus-visible {
    outline: 0;
  }
`

const StyledButton = styled('button')`
  border: 1px solid;
  border-radius: 10px;
  border-color: ${grey[200]};
  background: ${grey[50]};
  color: ${grey[900]};
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background: ${blue[500]};
    border-color: ${blue[400]};
    color: ${grey[50]};
  }

  &.increment {
    order: 1;
  }
`


export default {
    StyledInputRoot,
    StyledButton,
    StyledInput
}