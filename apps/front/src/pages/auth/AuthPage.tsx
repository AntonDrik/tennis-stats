import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useLoginMutation from '../../core/api/authApi/useLoginMutation'
import { appRoutes } from '../../routes/routes.constant'

import Styled from './AuthPage.styles'


function AuthPage() {
    const navigate = useNavigate()
    
    const auth = useLoginMutation()
    
    const [password, setPassword] = useState<string>('')
    
    const handleClick = () => {
        auth.mutateAsync({ password })
            .then((isValidPassword) => {
                console.log(isValidPassword)
                if (!isValidPassword) {
                    return
                }
                
                localStorage.setItem('isLoggedIn', String(true))
    
                navigate(appRoutes.TOURS_LIST)
            })
    }
    
    return (
        <Styled.Card>
            <Typography variant={'h2'} mb={2}>Авторизация</Typography>
            
            <TextField
                placeholder={'Введите пароль'}
                value={password}
                size={'small'}
                type={'password'}
                onChange={(e) => setPassword(e.target.value as string)}
            />
            
            <Box mt={2}>
                <Button
                    fullWidth
                    variant={'contained'}
                    onClick={handleClick}
                >Войти</Button>
            </Box>
        </Styled.Card>
    )
    


}

export default AuthPage