import { BoxProps, CircularProgress, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Styled from './Spinner.styles'


interface IProps extends BoxProps {
    page?: boolean
    size?: number
    caption?: string
    background?: boolean
}

function Spinner({ page, size, caption, background = true, ...props }: IProps): JSX.Element {
    
    useEffect(() => {
        if (page) {
            document.body.style.overflow = 'hidden'
        }
        return () => {
            if (page) {
                document.body.style.overflow = 'auto'
            }
        }
    }, [])
    
    if (page) {
        return (
            <Styled.PageWrapper
                gap={caption ? 1 : 0}
                sx={{ backgroundColor: background ? '#e7e7e74f' : 'transparent' }}
            >
                {caption && <Typography>{caption}</Typography>}
                <CircularProgress size={size}/>
            </Styled.PageWrapper>
        )
    }
    
    return (
        <Styled.Wrapper
            gap={caption ? 1 : 0}
            sx={{ backgroundColor: background ? '#e7e7e74f' : 'transparent', ...props.sx }}
        >
            <CircularProgress size={size}/>
            {caption && <Typography variant={'h6'} color={'black'}>{caption}</Typography>}
        </Styled.Wrapper>
    )
}

export default Spinner