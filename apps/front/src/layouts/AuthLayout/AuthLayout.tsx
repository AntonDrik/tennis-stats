import { ReactElement } from 'react';
import Styled from './AuthLayout.styles';

interface IProps {
  children: ReactElement;
}

function AuthLayout({ children }: IProps) {
  return (
    <Styled.Wrapper>
      <Styled.Gradient />

      {children}
    </Styled.Wrapper>
  );
}

export default AuthLayout;
