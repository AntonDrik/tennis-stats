import formatFn from 'date-fns/format'
import ruLocale from 'date-fns/locale/ru'
import parseISO from 'date-fns/parseISO'
import { zonedTimeToUtc } from 'date-fns-tz'
import startOfDay from 'date-fns/startOfDay'
import endOfDay from 'date-fns/endOfDay'

const clientTimezone = 'Europe/Minsk'
const dbDateFormat = 'yyyy-MM-dd HH:mm:ss'


function parseISOWithFormat(date: string | Date, format: string) {
    const parsedDate = parseISO(String(date))
    
    return formatFn(parsedDate, format, { locale: ruLocale })
}

function secondsWithTwoDigits(seconds: number | undefined): string {
    if (seconds === undefined) {
        return '00'
    }
    
    return seconds < 10 ? `0${seconds}` : String(seconds)
}

function startOfDayInUTC(date: Date, tz: string): Date {
    return zonedTimeToUtc(startOfDay(date), tz)
}

function endOfDayInUTC(date: Date, tz: string): Date {
    return zonedTimeToUtc(endOfDay(date), tz)
}

export {
    clientTimezone,
    dbDateFormat,
    secondsWithTwoDigits,
    parseISOWithFormat,
    startOfDayInUTC,
    endOfDayInUTC
}