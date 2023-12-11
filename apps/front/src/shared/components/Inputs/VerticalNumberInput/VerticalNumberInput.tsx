import React from 'react'
import {
    Unstable_NumberInput as BaseNumberInput,
    NumberInputProps,
} from '@mui/base/Unstable_NumberInput'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import Styled from './VerticalNumberInput.styles'


const VerticalNumberInput = React.forwardRef(function CustomNumberInput(
    props: NumberInputProps,
    ref: React.ForwardedRef<HTMLDivElement>,
) {
    return (
        <BaseNumberInput
            slots={{
                root: Styled.StyledInputRoot,
                input: Styled.StyledInput,
                incrementButton: Styled.StyledButton,
                decrementButton: Styled.StyledButton,
            }}
            slotProps={{
                incrementButton: {
                    children: <AddIcon fontSize="small"/>,
                    className: 'increment',
                },
                decrementButton: {
                    children: <RemoveIcon fontSize="small"/>,
                },
            }}
            {...props}
            ref={ref}
        />
    )
})

export default VerticalNumberInput