import { ISeason } from '@tennis-stats/types';
import { format } from 'date-fns/format';
import { getYear } from 'date-fns/getYear';
import { ru } from 'date-fns/locale';

function useGetSeasonDateCaption() {
  return (season?: ISeason, isFullDate = false): string => {
    if (!season) {
      return '';
    }

    if (isFullDate) {
      const start = format(season.startDate, `dd LLLL yyyy`, { locale: ru });
      const end = format(season.endDate, 'dd LLLL yyyy', { locale: ru });

      return `${start} - ${end}`;
    }

    const isOneYear = getYear(season.startDate) === getYear(season.endDate);

    const start = format(season.startDate, `${isOneYear ? 'LLLL' : 'LLLL yyyy'}`, { locale: ru });
    const end = format(season.endDate, 'LLLL yyyy', { locale: ru });

    return `${start} - ${end}`;
  };
}

export default useGetSeasonDateCaption;
