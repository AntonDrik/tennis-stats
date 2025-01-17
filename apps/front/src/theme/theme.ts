import { createTheme } from '@mui/material'
import overrides from './overrides'
import palette from './palette'
import typography from './typography'
import { responsiveFontSizes } from '@mui/material/styles'


const theme = createTheme({
    typography,
    palette,
    // @ts-ignore
    components: overrides,
    shape: {
        borderRadius: 5
    },
    // @ts-ignore
    status: {
        danger: '#e53e3e',
    },
})

export default responsiveFontSizes(theme)