import { FormControlLabel } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useAtomValue, useSetAtom } from 'jotai'
import { AndroidSwitch } from '../../../../../../shared/components'
import { dateStateAtom, updateDateStateAtom } from './DatePicker.state'


function DatePicker() {
    
    const dateState = useAtomValue(dateStateAtom)
    const setDateState = useSetAtom(updateDateStateAtom)
    
    const handleDatePickerChange = (newDate: Date | null) => {
        if (!newDate) {
            return
        }
        
        setDateState({ date: newDate })
    }
    
    const handleSwitchChange = (checked: boolean) => {
        setDateState({ isShowAll: checked })
    }
    
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MuiDatePicker
                    label="Дата"
                    value={dateState.date}
                    disabled={dateState.isShowAll}
                    onChange={handleDatePickerChange}
                />
            </LocalizationProvider>
            
            <FormControlLabel
                label="За все время"
                control={
                    <AndroidSwitch
                        checked={dateState.isShowAll}
                        onChange={(e, checked) => handleSwitchChange(checked)}
                    />
                }
            />
        </>
    )
    
}


export default DatePicker