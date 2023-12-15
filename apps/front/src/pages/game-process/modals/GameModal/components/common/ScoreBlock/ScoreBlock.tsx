import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import { useState } from 'react'
import { VerticalNumberInput } from '../../../../../../../shared/components'


interface IProps {
    onChange: (score: [number, number]) => void
}


function ScoreBlock({ onChange }: IProps) {
    
    const [score, setScore] = useState<[number, number]>([0, 0])
    
    const handleChangeInput = (type: 'player1' | 'player2', value: number | undefined) => {
        if (!Number.isFinite(value)) {
            return
        }
        
        if (type === 'player1') {
            setScore([value as number, score[1]])
            onChange([value as number, score[1]])
            
            return
        }
        
        if (type === 'player2') {
            setScore([score[0], value as number])
            onChange([score[0], value as number])
        }
        
        
    }
    
    return (
        <Stack direction={'row'} justifyContent={'center'}>
            <VerticalNumberInput
                value={score[0]}
                min={0}
                max={20}
                onChange={(e, value) => {
                    handleChangeInput('player1', value)
                }}
            />
            
            <Divider
                orientation={'vertical'}
                variant="middle"
                flexItem
                sx={{ mx: 3 }}
            />
            
            <VerticalNumberInput
                value={score[1]}
                min={0}
                max={20}
                onChange={(e, value) => {
                    handleChangeInput('player2', value)
                }}
            />
        </Stack>
    )
    
}

export default ScoreBlock