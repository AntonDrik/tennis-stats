import { Text } from '@radix-ui/themes';
import React, { useEffect } from 'react';
import Styled from './Spinner.styles';

interface IProps {
  page?: boolean;
  size?: number;
  caption?: string;
}

function Spinner({ page, caption }: IProps): JSX.Element {
  useEffect(() => {
    if (page) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      if (page) {
        document.body.style.overflow = 'auto';
      }
    };
  }, []);

  if (page) {
    return (
      <Styled.PageWrapper gap={caption ? '1' : '0'}>
        {caption && <Text>{caption}</Text>}
        <Styled.Loader />
      </Styled.PageWrapper>
    );
  }

  return (
    <Styled.Wrapper gap={caption ? '1' : '0'}>
      <Styled.Loader />
      {caption && <Text>{caption}</Text>}
    </Styled.Wrapper>
  );
}

export default Spinner;
