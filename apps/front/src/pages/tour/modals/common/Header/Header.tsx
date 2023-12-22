import { Box, Stack, Typography } from '@mui/material'
import { useAtomValue } from 'jotai'
import * as React from 'react'
import { tourPageState } from '../../../TourPage.state'


function ModalHeader() {
    
    const { selectedGameSet: gameSet } = useAtomValue(tourPageState)
    
    return (
        <Stack justifyContent={'center'} alignItems={'center'} px={3} py={2}>
            <Typography variant={'h4'} mb={1}>
                Сет № {gameSet?.number}
            </Typography>
            
            <Stack direction={'row'} width={'100%'}>
                <Box width={'50%'} px={1}>
                    <Typography variant={'h5'} fontWeight={600} align={'center'}>
                        {gameSet?.player1.user.shortFullName}
                    </Typography>
                </Box>
                
                <Box width={'50%'} px={1}>
                    <Typography variant={'h5'} fontWeight={600} align={'center'}>
                        {gameSet?.player2.user.shortFullName}
                    </Typography>
                </Box>
            </Stack>
        </Stack>
    )
    
}

export default ModalHeader