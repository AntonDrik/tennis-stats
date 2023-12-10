import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { EGameSetStatus, IGameSet, ITour } from '@tennis-stats/types'


interface IProps {
    activeTour: ITour
}

function MatchTable({ activeTour }: IProps) {
    
    const getStatus = (status: EGameSetStatus) => {
        switch (status) {
            case EGameSetStatus.PENDING:
            default:
                return {
                    caption: 'В ожидании',
                    color: '#E7E9E7',
                    borderColor: '#CCCFCC',
                    textColor: '#60655F'
                }
            case EGameSetStatus.IN_PROCESS:
                return {
                    caption: 'Идёт игра',
                    color: '#D5EFFF',
                    borderColor: '#8EC8F6',
                    textColor: '#0D74CE'
                }
            case EGameSetStatus.FINISHED:
                return {
                    caption: 'Завершен',
                    color: '#D6F1DF',
                    borderColor: '#8ECEAA',
                    textColor: '#218358'
                }
        }
    }
    
    const getScore = (set: IGameSet): string => {
        const { player1, player2 } = set
        return `${player1.score} | ${player2.score}`
    }
    
    return (
        <Box sx={{ mt: 3 }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Статус</TableCell>
                            <TableCell align="left">Игрок 1</TableCell>
                            <TableCell align="left">Игрок 2</TableCell>
                            <TableCell align="left">Счёт</TableCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        {
                            activeTour.gameSets.map((set) => {
                                const status = getStatus(set.status)
                                
                                return (
                                    <TableRow
                                        key={set.id}
                                        sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            backgroundColor: set.status === EGameSetStatus.IN_PROCESS ? '#F1FAFD' : 'inherit'
                                        }}
                                    >
                                        <TableCell align="left">
                                            <Chip
                                                label={status.caption}
                                                sx={{
                                                    backgroundColor: status.color,
                                                    color: status.textColor,
                                                    border: `1px solid ${status.borderColor}`
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="left">{set.player1.user.lastName}</TableCell>
                                        <TableCell align="left">{set.player2.user.lastName}</TableCell>
                                        <TableCell align="left">{getScore(set)}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
    
    
}

export default MatchTable