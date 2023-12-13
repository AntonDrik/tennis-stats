import formatFn from 'date-fns/format'
import ruLocale from 'date-fns/locale/ru'
import parseISO from 'date-fns/parseISO'

const clientTimezone = 'Europe/Minsk'
const dbDateFormat = 'yyyy-MM-dd HH:mm:ss'


function parseISOWithFormat(date: string | Date, format: string) {
    const parsedDate = parseISO(String(date))
    
    return formatFn(parsedDate, format, { locale: ruLocale })
}

export {
    clientTimezone,
    dbDateFormat,
    parseISOWithFormat
}