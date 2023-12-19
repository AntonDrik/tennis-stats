import { useAtomValue } from 'jotai'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

import { backButtonAtom } from './BackButton.state'


function BackButton() {
    const navigate = useNavigate()
    
    const state = useAtomValue(backButtonAtom)
    
    const handleClick = () => {
        navigate(state?.link as string)
    }
    
    if (!state) {
        return null
    }
    
    return (
        <Button
            variant={'outlined'}
            startIcon={<ArrowBackIosIcon/>}
            sx={{ lineHeight: '25px' }}
            onClick={handleClick}
        >
            {state.title}
        </Button>
    )
    
}


export default BackButton