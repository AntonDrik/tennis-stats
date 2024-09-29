import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ILeaderboardItem, IUser } from '@tennis-stats/types';

interface IProps {
  leaderboardItems: ILeaderboardItem[] | undefined;
  tableHeight?: number | string;
  onlyTotal?: boolean;
  hideUsersIds?: number[];
  onRemove?: (user: IUser) => void;
}

function Leaderboard(props: IProps) {
  if (!props.leaderboardItems) {
    return <Typography>Нет данных</Typography>;
  }

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ height: props.tableHeight }}
    >
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell width={30} sx={{ px: 1 }} align="center">
              №
            </TableCell>

            <TableCell align="left" sx={{ px: 1 }}>
              Игрок
            </TableCell>

            <TableCell align="center">Очки</TableCell>

            {!props.onlyTotal && <TableCell align="center">Г</TableCell>}

            {!props.onlyTotal && <TableCell align="center">Побед</TableCell>}

            {props.onRemove && <TableCell />}
          </TableRow>
        </TableHead>

        <TableBody>
          {props.leaderboardItems
            .filter((item) => !props.hideUsersIds?.includes(item.user.id))
            .map((item, index) => (
              <TableRow key={`leaderboard-item-${index}`}>
                <TableCell align="center" padding={'none'} sx={{ px: 1 }}>
                  {index + 1}
                </TableCell>

                <TableCell align="left" sx={{ px: 1 }}>
                  {item.user.nickname} | {item.user.id}
                </TableCell>

                <TableCell align="center" width={20} sx={{ px: 1 }}>
                  {item.total}
                </TableCell>

                {!props.onlyTotal && (
                  <TableCell align="center" sx={{ px: 1 }}>
                    {item.scoreDiff}
                  </TableCell>
                )}

                {!props.onlyTotal && (
                  <TableCell align="center" sx={{ px: 1 }}>
                    {item.wins}
                  </TableCell>
                )}

                {props.onRemove && (
                  <TableCell align="right" width={20} sx={{ pl: 0 }}>
                    <IconButton
                      size={'small'}
                      onClick={() => props.onRemove?.(item.user)}
                    >
                      <DeleteForeverIcon color={'error'} fontSize={'small'} />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Leaderboard;
