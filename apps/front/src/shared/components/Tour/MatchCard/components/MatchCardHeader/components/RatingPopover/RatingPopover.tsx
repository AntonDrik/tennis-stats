import InfoIcon from '@mui/icons-material/Info'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Popover from '@mui/material/Popover'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { IMatch } from '@tennis-stats/types'
import React, { MouseEvent } from 'react'
import { useMatchOrderQuery } from '../../../../../../../../core/api'
import { Spinner } from '../../../../../../index'

import Styled from './RatingPopover.styles'


interface IProps {
    match: IMatch
}

function RatingPopover({ match }: IProps) {
    
    const { data, isLoading } = useMatchOrderQuery(match.id)
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
    const open = Boolean(anchorEl)
    
    const handleClose = () => {
        setAnchorEl(null)
    }
    
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    
    return (
        <Styled.Wrapper>
            <IconButton
                color={'info'}
                disabled={isLoading || !data}
                onClick={handleClick}
            >
                {isLoading && <Spinner/>}
                <InfoIcon/>
            </IconButton>
            
            
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Stack p={2}>
                    <Typography>Дельта рейтинга</Typography>
    
                    {
                        data &&
                        <List dense sx={{pb: 0}}>
                            {
                                data.map((score, index) => (
                                    <React.Fragment>
                                        {
                                            score.map((rating) => (
                                                <ListItem disableGutters>
                                                    <ListItemText
                                                        primary={`При счёте ${rating.score}`}
                                                        secondary={`Победителю: +${rating.delta}, Проигравшему: -${rating.delta}`}
                                                    />
                                                </ListItem>
                                            ))
                                        }
                                        {
                                            index !== data.length - 1 &&
                                            <Divider/>
                                        }
                                    </React.Fragment>
                                ))
                            }
                        </List>
                    }
                   
                </Stack>
            </Popover>
        </Styled.Wrapper>
    )
    
}

export default RatingPopover