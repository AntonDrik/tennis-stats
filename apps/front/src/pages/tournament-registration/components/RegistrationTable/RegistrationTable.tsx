import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { IUser } from '@tennis-stats/types';
import AdminActionsCell from './components/AdminActionsCell/AdminActionsCell';

interface IProps {
  isAdmin?: boolean;
  usersList: IUser[];
  onRowClick?: (user: IUser) => void;
}

function RegistrationTable(props: IProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Никнейм</TableCell>
            <TableCell>Рейтинг</TableCell>
            {props.isAdmin && <TableCell align={'center'}>Действия</TableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {props.usersList.map((user) => {
            return (
              <TableRow
                key={user.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  cursor: 'pointer',
                }}
                onClick={() => props.onRowClick?.(user)}
              >
                <TableCell align="left">{user.nickname}</TableCell>
                <TableCell align="left">
                  <Stack direction={'row'} alignItems={'center'}>
                    {Math.round(user.rating)}
                  </Stack>
                </TableCell>

                {props.isAdmin && (
                  <TableCell width={20} align={'center'}>
                    <AdminActionsCell user={user} />
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RegistrationTable;
