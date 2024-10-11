import { formatDate } from 'date-fns/format';
import { ru } from 'date-fns/locale/ru';
import { parseISO } from 'date-fns/parseISO';
import { fromZonedTime } from 'date-fns-tz';
import { startOfDay } from 'date-fns/startOfDay';
import { endOfDay } from 'date-fns/endOfDay';

const clientTimezone = 'Europe/Minsk';
const dbDateFormat = 'yyyy-MM-dd HH:mm:ss';

function parseISOWithFormat(date: string | Date, format: string) {
  const parsedDate = parseISO(String(date));

  return formatDate(parsedDate, format, { locale: ru });
}

function secondsWithTwoDigits(seconds: number | undefined): string {
  if (seconds === undefined) {
    return '00';
  }

  return seconds < 10 ? `0${seconds}` : String(seconds);
}

function startOfDayInUTC(date: Date, tz: string): Date {
  return fromZonedTime(startOfDay(date), tz);
}

function endOfDayInUTC(date: Date, tz: string): Date {
  return fromZonedTime(endOfDay(date), tz);
}

export {
  clientTimezone,
  dbDateFormat,
  secondsWithTwoDigits,
  parseISOWithFormat,
  startOfDayInUTC,
  endOfDayInUTC,
};
