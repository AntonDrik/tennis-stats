import { IUsersScoreDiff } from '@tennis-stats/types'
import { useMemo } from 'react'
import { AxisOptions, Chart, UserSerie } from 'react-charts'


interface IValues {
    date: string,
    diffValue: number
}

interface IProps {
    user1Name: string
    user2Name: string
    data: IUsersScoreDiff[]
}

function SparkChart({ data, user1Name, user2Name }: IProps) {
    
    const xAxis = useMemo((): AxisOptions<IValues> => ({
        getValue: datum => datum.date,
        show: false
    }), [])
    
    const yAxis = useMemo((): AxisOptions<IValues>[] => [
        {
            getValue: datum => datum.diffValue,
            scaleType: 'linear',
            elementType: 'line',
            show: false
        },
    ], [])
    
    const series = useMemo((): UserSerie<IValues>[] => {
        return [
            {
                id: user1Name,
                label: user1Name,
                data: data.map((i) => ({
                    date: i.formattedDate,
                    diffValue: Number(i.user1AvgScore)
                }))
            },
            {
                id: user2Name,
                label: user2Name,
                data: data.map((i) => ({
                    date: i.formattedDate,
                    diffValue: Number(i.user2AvgScore)
                }))
            }
        ]
    }, [data])
    
    return (
        <Chart
            options={{
                data: series,
                primaryAxis: xAxis,
                secondaryAxes: yAxis,
            }}
        />
    )
    
}

export default SparkChart