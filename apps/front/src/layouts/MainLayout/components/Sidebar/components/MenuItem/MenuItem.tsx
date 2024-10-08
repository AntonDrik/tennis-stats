import { Text } from '@radix-ui/themes';
import { useLocation, useNavigate } from 'react-router-dom';

import { IMenuLinkItem } from '../../Sidebar.types';
import Styled from './MenuItem.styles';

function MenuItem({ title, link, icon }: IMenuLinkItem) {
  const navigate = useNavigate();
  const location = useLocation();

  const isSelected = location.pathname.includes(link);

  const handleClick = () => {
    navigate(link);
  };

  return (
    <Styled.Button
      variant={'ghost'}
      data-state={isSelected ? 'open' : null}
      onClick={handleClick}
    >
      {icon}

      <Text size={'3'} ml={'2'} style={{ color: 'var(--sage-12)' }}>
        {title}
      </Text>
    </Styled.Button>
  );
}

export default MenuItem;
