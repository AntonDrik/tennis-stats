import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { ListItemIcon } from '@mui/material'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { ChartLegendHook } from './useChartLegend'
import Styled from './Legend.styles'


interface IProps {
    data: ChartLegendHook
    getColorFn: (category: string) => string
    colorizeCaption?: boolean
    skipClick?: boolean
}

function ChartLegend({ data, getColorFn, colorizeCaption, skipClick = false }: IProps) {
    
    const legendId = Math.random().toString(16)
    
    const handleClick = (category: string) => {
        if (skipClick) {
            return
        }
        data.toggle(category)
    }
    
    const getColor = (category: string, isCategoryEnabled: boolean) => {
        return !isCategoryEnabled ? getColorFn(category) : 'grey'
    }
    
    return (
        <Styled.Wrapper>
            {
                data.arrayState.map(([category, value]) => (
                    <Styled.Item
                        direction={'row'}
                        skipclick={skipClick}
                        key={`${legendId}-${category}`}
                        onClick={() => handleClick(category)}
                    >
                        <ListItemIcon sx={{ marginRight: 1, minWidth: 0 }}>
                            <FiberManualRecordIcon sx={{ fontSize: 12, color: getColor(category, value) }}/>
                        </ListItemIcon>
                        
                        <Typography
                            noWrap
                            color={colorizeCaption ? getColor(category, value) : 'inherit'}
                        >{category}</Typography>
                    
                    </Styled.Item>
                ))
            }
        </Styled.Wrapper>
    )
    
}

export default ChartLegend