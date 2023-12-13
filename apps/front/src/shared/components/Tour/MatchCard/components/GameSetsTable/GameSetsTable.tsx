import { Typography } from '@mui/material'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { EGameSetStatus, IGameSet } from '@tennis-stats/types'

import Styled from './GameSetsTable.styles'


interface IProps {
    gameSetList: IGameSet[]
    onRowClick?: (gameSet: IGameSet, setIndex: number) => void
}

function GameSetsTable({ gameSetList, onRowClick }: IProps) {
    
    const getStatusChip = (status: EGameSetStatus) => {
        switch (status) {
            case EGameSetStatus.READY_TO_START:
                return <Chip label={'Готов к старту'} color={'info'} size={'small'}/>
            
            case EGameSetStatus.IN_PROCESS:
                return <Chip label={'Идёт игра'} color={'info'} size={'small'}/>
            
            case EGameSetStatus.FINISHED:
                return <Chip label={'Завершен'} color={'success'} size={'small'}/>
            
            case EGameSetStatus.CANCELED:
                return <Chip label={'Отменён'} color={'error'} size={'small'}/>
            
            case EGameSetStatus.PENDING:
            default:
                return <Chip label={'В ожидании'} size={'small'}/>
        }
    }
    
    return (
        <TableContainer>
            <Table size={'small'}>
                <TableBody>
                    {
                        gameSetList.map((set, index) => (
                            <Styled.TableRow
                                key={set.id}
                                status={set.status}
                                onClick={() => onRowClick?.(set, index + 1)}
                            >
                                <TableCell align="left">
                                    <Typography variant={'overline'}>{index + 1} Сет</Typography>
                                </TableCell>
                                <TableCell align="left">{getStatusChip(set.status)}</TableCell>
                                <TableCell align="left">{set.setScore}</TableCell>
                            </Styled.TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
    
}

export default GameSetsTable