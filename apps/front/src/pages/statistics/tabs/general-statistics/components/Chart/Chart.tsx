import { Stack } from '@mui/material'
import { mapToArray } from '@tennis-stats/helpers'
import { IAvgRatingByDay } from '@tennis-stats/types'
import { format, parse } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'
import { useCallback, useMemo } from 'react'
import { LineChart, Tooltip, CartesianGrid, Line, YAxis, XAxis } from 'recharts'
import { ChartLegend, ChartTooltip, useChartLegend } from '../../../../../../shared/components'
import { useMap } from '../../../../../../shared/hooks/useMap'
import Styled from './Chart.styles'


type TUsersList = {
    [key in string]: number | string
}


interface IProps {
    data: IAvgRatingByDay[]
}

function SparkChart({ data }: IProps) {
    
    const [users, usersActions] = useMap<string, IAvgRatingByDay>([])
    
    const categories = useMemo(() => {
        return mapToArray(users).map((user) => user.userLastName)
    }, [users])
    
    const chartLegend = useChartLegend(categories)
    
    const usersList = useMemo(() => {
        const uniqueUsers = new Map<string, IAvgRatingByDay>()
        
        const list = data.reduce((acc, curr) => {
            const found = acc.find((item) => String(item.date) === String(curr.formattedDate))
            
            uniqueUsers.set(curr.userLastName, curr)
            
            if (found) {
                found[curr.userLastName] = curr.rating
                
                return acc
            }
            
            acc.push({
                date: String(curr.formattedDate),
                [curr.userLastName]: curr.rating
            })
            
            return acc
        }, [] as Array<TUsersList>)
        
        usersActions.setAll(uniqueUsers)
        
        return list
    }, [data])
    
    const getTooltipDateCaption = (label: string) => {
        const parsedDate = parse(label, 'dd-MM-yyyy', new Date())
        return format(parsedDate, 'dd MMM yyyy', {locale: ruLocale })
    }
    
    const getLegendColor = useCallback((category: string) => {
        return users.get(category)?.userColor || 'gray'
    }, [users])
    
    return (
        <Stack height={'340px'} width={'100%'}>
            
            <Styled.ResponsiveContainer width={'100%'} height={'85%'}>
                <LineChart
                    data={usersList}
                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                >
                    <CartesianGrid
                        strokeDasharray="7"
                        strokeWidth={0.5}
                        vertical={false}
                        syncWithTicks
                        stroke={'#CBCFCD'}
                    />
                    
                    <YAxis
                        scale={'linear'}
                        width={40}
                        domain={['dataMin - 20', 'dataMax + 20']}
                    />
                    
                    <XAxis
                        dataKey={'date'}
                        hide
                    />
                    
                    <Tooltip
                        isAnimationActive={false}
                        content={
                            <ChartTooltip
                                dateFormatter={getTooltipDateCaption}
                                valueFormatter={(value) => Math.round(Number(value))}
                                getColorFn={getLegendColor}
                            />
                        }
                    />
                    
                    {
                        mapToArray(users).map((user) => (
                            <Line
                                type="natural"
                                hide={chartLegend.isDisabled(user.userLastName)}
                                dataKey={user.userLastName}
                                stroke={user.userColor}
                                strokeWidth={4}
                                dot={{
                                    fill: user.userColor,
                                    strokeOpacity: 0,
                                    r: 6
                                }}
                                activeDot={{
                                    fill: user.userColor,
                                    strokeOpacity: 0,
                                    r: 8
                                }}
                            />
                        ))
                    }
                </LineChart>
            </Styled.ResponsiveContainer>
    
            <ChartLegend
                data={chartLegend}
                getColorFn={getLegendColor}
            />
        </Stack>
    )
    
}

export default SparkChart