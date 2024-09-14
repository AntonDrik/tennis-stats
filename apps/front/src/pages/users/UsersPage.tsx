import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Stack,
  Button
} from '@mui/material';
import { IUserWithRatingDiff } from '@tennis-stats/types';
import { useNavigate } from 'react-router-dom';
import { useUsersQuery } from '../../core/api';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { appRoutes } from '../../routes/routes.constant';
import { useModal } from '../../shared/components';
import usePermissions from '../../shared/hooks/usePermissions';
import CreateUserModal from './modals/CreateUserModal/CreateUserModal';


export default function UsersPage() {

  const { data: usersList } = useUsersQuery();

  const modal = useModal();
  const navigate = useNavigate();
  const permissions = usePermissions();

  const handleNewUserClick = () => {
    modal.open(<CreateUserModal />);
  };

  const handleRowClick = (user: IUserWithRatingDiff) => {
    navigate(appRoutes.PROFILE(user.id));
  };

  const getRatingInfo = (user: IUserWithRatingDiff) => {
    const rating = Number(user.ratingDiff);

    if (rating === 0) {
      return { color: 'inherit', icon: null };
    }

    if (rating > 0) {
      return { color: 'green', icon: <ArrowDropUpIcon color={'success'} /> };
    }

    return { color: 'brown', icon: <ArrowDropDownIcon color={'error'} /> };
  };

  return (
    <Box>
      <Stack direction={'row'} alignItems={'center'} mb={2} gap={2}>
        <Typography variant='h4'>Пользователи</Typography>
        {
          permissions.canCreateUser &&
          <Button
            variant={'contained'}
            color={'success'}
            size={'small'}
            sx={{ minWidth: 40 }}
            onClick={handleNewUserClick}
          >
            <AddIcon />
          </Button>
        }
      </Stack>

      {
        usersList &&
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Имя</TableCell>
                <TableCell>Фамилия</TableCell>
                <TableCell>Рейтинг</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {
                usersList.map((user) => {
                  const ratingInfo = getRatingInfo(user);

                  return (
                    <TableRow
                      key={user.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                      onClick={() => handleRowClick(user)}
                    >
                      <TableCell align='left'>{user.firstName}</TableCell>
                      <TableCell align='left'>{user.lastName}</TableCell>
                      <TableCell align='left'>
                        <Stack direction={'row'} alignItems={'center'} sx={{ color: ratingInfo.color }}>
                          {Math.round(user.rating)} ({user.ratingDiff})
                          {ratingInfo.icon}
                        </Stack>

                      </TableCell>
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      }
    </Box>
  );

}
