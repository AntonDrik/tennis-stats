import Avatar from '@mui/material/Avatar';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { meAtom } from '../../../../../../core/store';
import { appRoutes } from '../../../../../../routes/routes.constant';

function ProfileAvatar() {
  const navigate = useNavigate();

  const me = useAtomValue(meAtom);

  const handleClick = () => {
    navigate(appRoutes.PROFILE(me?.id));
  };

  return (
    <Avatar sx={{ cursor: 'pointer' }} onClick={handleClick}>
      {me?.nickname.substring(0, 1)}
    </Avatar>
  );
}

export default ProfileAvatar;
