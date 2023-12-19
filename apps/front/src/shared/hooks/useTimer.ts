import { useEffect, useRef, useState } from 'react'
import parseISO from 'date-fns/parseISO'
import intervalToDuration from 'date-fns/intervalToDuration'


function useTimer() {
    
    const [time, setTime] = useState<string>('00:00')
    const intervalID = useRef<NodeJS.Timer>()
    
    const start = (startDate: string) => {
        if (!startDate || startDate === 'null') {
            return
        }
        
        increment(startDate)
        intervalID.current = setInterval(() => {
            increment(startDate)
        }, 1000)
    }
    
    const stop = () => {
        clearInterval(intervalID.current)
    }
    
    const increment = (startDate: string) => {
        const start = parseISO(startDate)
        const end = new Date()
        const diff = intervalToDuration({ start, end })
        
        // @ts-ignore
        const sec = diff.seconds < 10 ? `0${diff.seconds}` : diff.seconds
        
        setTime(`${diff.minutes}:${sec}`)
    }
    
    useEffect(() => {
        return () => stop()
    }, [])
    
    return {
        start,
        stop,
        time
    }
    
}

export default useTimer