import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useAtomValue, useSetAtom } from 'jotai';
import { dateStateAtom, updateDateStateAtom } from './DatePicker.state';
import useAvailableDatesQuery from '../../../../../../core/api/statistic/useAvailableDatesQuery';
import { format, parseISO } from 'date-fns';

const DATE_FORMAT = 'yyyy-MM-dd';

function DatePicker() {
  const dateState = useAtomValue(dateStateAtom);
  const setDateState = useSetAtom(updateDateStateAtom);
  const { data: availableDates } = useAvailableDatesQuery();

  const dates = (availableDates ?? []).map(({ date }) =>
    format(parseISO(date), DATE_FORMAT)
  );

  const handleDatePickerChange = (newDate: Date | null) => {
    if (!newDate) {
      return;
    }

    setDateState({ date: newDate });
  };

  const handleSwitchChange = (checked: boolean) => {
    setDateState({ isShowAll: checked });
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MuiDatePicker
          label="Дата"
          value={dateState.date}
          shouldDisableDate={(date) => !dates.includes(format(date, DATE_FORMAT))}
          disabled={dateState.isShowAll}
          onChange={handleDatePickerChange}
        />
      </LocalizationProvider>
    </>
  );
}

export default DatePicker;
