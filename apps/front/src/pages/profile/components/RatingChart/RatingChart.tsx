import Box from '@mui/material/Box'
import { IUser } from '@tennis-stats/types'
import { format, parse } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import useRatingHistoryQuery from '../../../../core/api/statisticsApi/useRatingHistoryQuery'
import { ChartStyles, ChartTooltip, Spinner } from '../../../../shared/components'


interface IProps {
    user: IUser
}

function RatingChart({ user }: IProps) {
    
    const { data, isLoading } = useRatingHistoryQuery(user.id)
    
    const getTooltipDateCaption = (label: string) => {
        const parsedDate = parse(label, 'dd-MM-yyyy', new Date())
        return format(parsedDate, 'dd MMM yyyy', { locale: ruLocale })
    }
    
    return (
        <Box height={'340px'} width={'100%'} position={'relative'}>
            {isLoading && <Spinner/>}
            
            <ChartStyles.ResponsiveContainer width={'100%'} height={'100%'}>
                <LineChart
                    data={data}
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
                        dataKey={'rating'}
                        scale={'linear'}
                        width={40}
                        domain={['dataMin - 20', 'dataMax + 20']}
                    />
                    
                    <XAxis
                        dataKey={'formattedDate'}
                        hide
                    />
                    
                    <Tooltip
                        isAnimationActive={false}
                        content={
                            <ChartTooltip
                                dateFormatter={getTooltipDateCaption}
                                valueFormatter={(value) => Math.round(Number(value))}
                                getColorFn={() => user.color}
                            />
                        }
                    />
                    
                    <Line
                        type="natural"
                        dataKey={'rating'}
                        stroke={user.color}
                        strokeWidth={4}
                        dot={{
                            fill: user.color,
                            strokeOpacity: 0,
                            r: 6
                        }}
                        activeDot={{
                            fill: user.color,
                            strokeOpacity: 0,
                            r: 8
                        }}
                    />
                
                </LineChart>
            </ChartStyles.ResponsiveContainer>
        </Box>
    )
    
}

export default RatingChart