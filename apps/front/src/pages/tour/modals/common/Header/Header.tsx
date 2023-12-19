import { Box, Stack, Typography } from '@mui/material'
import { IGameSet } from '@tennis-stats/types'
import * as React from 'react'


interface IProps {
    gameSet: IGameSet
}

function ModalHeader({ gameSet }: IProps) {
    
    return (
        <Stack justifyContent={'center'} alignItems={'center'} px={3} py={2}>
            <Typography variant={'h4'} mb={1}>
                Сет № {gameSet?.number}
            </Typography>
            
            <Stack direction={'row'} width={'100%'}>
                <Box width={'50%'}>
                    <Typography variant={'h5'} fontWeight={600}>
                        {gameSet?.player1.user.shortFullName}
                    </Typography>
                </Box>
                
                <Box width={'50%'}>
                    <Typography variant={'h5'} fontWeight={600}>
                        {gameSet?.player2.user.shortFullName}
                    </Typography>
                </Box>
            </Stack>
        </Stack>
    )
    
}

export default ModalHeader