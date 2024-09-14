import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { List, ListItem, ListItemIcon } from '@mui/material'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { NameType, Payload, ValueType } from 'recharts/types/component/DefaultTooltipContent'
import { TooltipProps } from 'recharts/types/component/Tooltip'

import Styled from './Tooltip.styles'


interface IProps<T> extends TooltipProps<ValueType, NameType> {
    dateFormatter?: (label: T) => string
    valueFormatter?: (value: ValueType | undefined) => ValueType
    getColorFn: (dataKey: string) => string
}

function ChartTooltip<T = string>(
    {
        active,
        payload,
        label,
        getColorFn,
        valueFormatter,
        dateFormatter,
        
    }: IProps<T>
) {
    
    const sortByDataKey = (a: Payload<ValueType, NameType>, b: Payload<ValueType, NameType>) => {
        return String(a.dataKey).localeCompare(String(b.dataKey))
    }
    
    
    if (!active || !payload || !payload.length) {
        return null
    }
    
    return (
        <Styled.Wrapper>
            
            <Typography variant={'h6'} fontWeight={700} align={'center'}>
                {dateFormatter ? dateFormatter(label) : label}
            </Typography>
            
            <List sx={{ paddingBottom: 0 }}>
                {
                    payload
                        .sort(sortByDataKey)
                        .map((item) => (
                            <ListItem key={`${item.dataKey}-${item.value}`} disableGutters dense>
                                
                                <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
                                    <FiberManualRecordIcon
                                        sx={{
                                            fontSize: 12,
                                            color: getColorFn?.(item.dataKey as string)
                                        }}
                                    />
                                </ListItemIcon>
                                
                                <Styled.Item direction={'row'}>
                                    <Typography sx={{ textTransform: 'capitalize' }}>
                                        {item.dataKey}:
                                    </Typography>
                                    
                                    <Typography variant={'h6'} fontWeight={700}>
                                        {valueFormatter ? valueFormatter(item.value) : item.value}
                                    </Typography>
                                </Styled.Item>
                            
                            </ListItem>
                        ))
                }
            </List>
        
        </Styled.Wrapper>
    )
    
}

export default ChartTooltip