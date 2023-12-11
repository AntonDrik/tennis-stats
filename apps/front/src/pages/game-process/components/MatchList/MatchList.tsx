import { Stack } from '@mui/material'
import { ITour } from '@tennis-stats/types'
import MatchCard from './components/MatchCard/MatchCard'


interface IProps {
    activeTour: ITour
}

function MatchList({ activeTour }: IProps) {

    return (
        <Stack spacing={2}>
            {
                activeTour.matches.map((match) => (
                    <MatchCard
                        key={match.id}
                        match={match}
                    />
                ))
            }
        </Stack>
    )
    
    
}

export default MatchList