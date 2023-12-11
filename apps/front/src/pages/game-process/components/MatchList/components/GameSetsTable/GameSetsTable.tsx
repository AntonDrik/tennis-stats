import { Typography } from '@mui/material'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { EGameSetStatus, IGameSet } from '@tennis-stats/types'
import { useModal } from '../../../../../../shared/components'
import GameModalContainer from '../../../../modals/GameModal/GameModalContainer'

import Styled from './GameSetsTable.styles'


interface IProps {
    gameSetList: IGameSet[]
}


function GameSetsTable({ gameSetList }: IProps) {
    
    const modal = useModal()
    
    const activeGameSet = gameSetList.find((gameSet) => {
        return gameSet.status === EGameSetStatus.IN_PROCESS
    })
    
    const getStatusChip = (status: EGameSetStatus) => {
        switch (status) {
            case EGameSetStatus.PENDING:
            default:
                return <Chip label={'В ожидании'} size={'small'}/>
            case EGameSetStatus.IN_PROCESS:
                return <Chip label={'Идёт игра'} color={'info'} size={'small'}/>
            case EGameSetStatus.FINISHED:
                return <Chip label={'Завершен'} color={'success'} size={'small'}/>
        }
    }
    
    const handleRowClick = (gameSet: IGameSet, setIndex: number) => {
        if (gameSet.status === EGameSetStatus.FINISHED) {
            return
        }
        
        if (activeGameSet && activeGameSet.id !== gameSet.id) {
            return
        }
        
        modal.open(
            <GameModalContainer gameSet={gameSet} setIndex={setIndex}/>,
            { maxWidth: 'xl', fullWidth: true }
        )
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
                                onClick={() => handleRowClick(set, index + 1)}
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