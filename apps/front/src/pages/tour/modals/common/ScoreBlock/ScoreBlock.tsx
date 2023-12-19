import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import { TScore } from '@tennis-stats/types'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { VerticalNumberInput } from '../../../../../shared/components'
import { scoreBlockAtom } from './ScoreBlock.state'


interface IProps {
    onChange: (score: [TScore, TScore]) => void
}


function ScoreBlock({ onChange }: IProps) {
    
    const [score, setScore] = useAtom(scoreBlockAtom)
    
    const [value1, setValue1] = useState<TScore>(0)
    const [value2, setValue2] = useState<TScore>(0)
    
    const handleChangeInput = (type: 'player1' | 'player2', value: number | undefined) => {
        if (!Number.isFinite(value)) {
            return
        }
        
        if (type === 'player1') {
            setScore([value as TScore, score[1]])
            onChange([value as TScore, score[1]])
            
            return
        }
        
        if (type === 'player2') {
            setScore([score[0], value as TScore])
            onChange([score[0], value as TScore])
        }
    }
    
    useEffect(() => {
        setValue1(score[0])
        setValue2(score[1])
    }, [score])
    
    return (
        <Stack direction={'row'} justifyContent={'center'}>
            <VerticalNumberInput
                value={value1}
                min={0}
                max={20}
                onChange={(e, value) => {
                    handleChangeInput('player1', value)
                }}
                onInputChange={(e) => {
                    handleChangeInput('player1', Number(e.target.value))
                }}
            />
            
            <Divider
                orientation={'vertical'}
                variant="middle"
                flexItem
                sx={{ mx: 3 }}
            />
            
            <VerticalNumberInput
                value={value2}
                min={0}
                max={20}
                onChange={(e, value) => {
                    handleChangeInput('player2', value)
                }}
                onInputChange={(e) => {
                    handleChangeInput('player2', Number(e.target.value))
                }}
            />
        </Stack>
    )
    
}

export default ScoreBlock