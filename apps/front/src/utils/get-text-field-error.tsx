import { TextFieldProps } from '@mui/material'
import React from 'react'
import { FieldErrors } from 'react-hook-form'

import isDefined from './is-defined'


const renderErrorMessage = <T extends FieldErrors>(errors: T, name: keyof T) => {
    if (!errors[name]) {
        return null
    }
    
    console.log(errors[name])
    
    const message = String(errors[name]?.message ?? '')
    
    return (
        <React.Fragment>
            {
                message
                    .split('\n')
                    .map((i) => (
                        <span key={i} style={{ fontSize: 12 }}>{i}<br/></span>
                    ))
            }
        </React.Fragment>
    )
}


function getTextFieldError<T extends FieldErrors>(errors: T, name: keyof T): TextFieldProps {
    return {
        error: isDefined(errors[name]),
        helperText: renderErrorMessage(errors, name)
    }
}

export default getTextFieldError