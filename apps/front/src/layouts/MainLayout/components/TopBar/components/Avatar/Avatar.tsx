import { Avatar, Text, DropdownMenu } from '@radix-ui/themes';
import { useAtom, useAtomValue } from 'jotai';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../../../../../core/api';
import { meAtom } from '../../../../../../core/store';
import { appearanceAtom } from '../../../../../../core/store/appearance.store';
import { appRoutes } from '../../../../../../routes/routes.constant';
import {
  DarkIcon,
  ExitIcon,
  SunIcon,
  PersonIcon,
} from '../../../../../../shared/svg-icons';

const dict = {
  light: 'Темная тема',
  dark: 'Светлая тема',
};

function ProfileAvatar() {
  const navigate = useNavigate();

  const logoutMutation = useLogoutMutation();

  const me = useAtomValue(meAtom);
  const [appearance, setAppearance] = useAtom(appearanceAtom);

  const gotoProfile = () => {
    // navigate(appRoutes.PROFILE(me?.id));
  };

  const changeAppearance = () => {
    if (appearance === 'light') {
      setAppearance('dark');
    } else {
      setAppearance('light');
    }
  };

  const logout = () => {
    logoutMutation.mutate();
    navigate(appRoutes.LOGIN);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Text>
          <Avatar fallback={me?.nickname.substring(0, 1) ?? 'A'} radius={'full'} />
        </Text>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align={'end'}>
        <DropdownMenu.Item disabled onClick={gotoProfile}>
          <PersonIcon />
          Профиль
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={changeAppearance}>
          {appearance === 'dark' ? <SunIcon /> : <DarkIcon />}
          {dict[appearance]}
        </DropdownMenu.Item>

        <DropdownMenu.Separator />
        <DropdownMenu.Item color="red" onClick={logout}>
          <ExitIcon /> Выйти
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default memo(ProfileAvatar);
