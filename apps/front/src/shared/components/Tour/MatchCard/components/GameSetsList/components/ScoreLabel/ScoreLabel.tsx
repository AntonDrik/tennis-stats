import { Typography } from '@mui/material'
import { IPlayer } from '@tennis-stats/types'


interface IProps {
    player: IPlayer
}

function ScoreLabel({ player }: IProps) {
    
    return (
        <Typography
            fontWeight={player.isWinner ? 700 : 400}
        >
            {player.score}
        </Typography>
    )
    
}

export default ScoreLabel