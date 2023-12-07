import { TypographyOptions } from '@mui/material/styles/createTypography'


export function pxToRem(value: number) {
    return `${value / 16}rem`
}

function responsiveFontSizes({ xs, sm, md, lg }: { xs?: number, sm: number, md: number, lg: number }) {
    return {
        ...(xs && {
            '@media (min-width:320px)': {
                fontSize: pxToRem(xs)
            }
        }),
        '@media (min-width:600px)': {
            fontSize: pxToRem(sm)
        },
        '@media (min-width:900px)': {
            fontSize: pxToRem(md)
        },
        '@media (min-width:1200px)': {
            fontSize: pxToRem(lg)
        }
    }
}

const FONT_PRIMARY = "'DM Sans', sans-serif"

const typography: TypographyOptions = {
    fontFamily: FONT_PRIMARY,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    body1: {
        fontWeight: 400,
        fontSize: pxToRem(16)
    },
    body2: {
        lineHeight: 22 / 14,
        fontSize: pxToRem(14)
    },
    h1: {
        fontWeight: 500,
        lineHeight: '56px',
        fontSize: pxToRem(48),
        textTransform: 'uppercase',
        ...responsiveFontSizes({ xs: 36, sm: 40, md: 44, lg: 48 })
    },
    h2: {
        fontWeight: 500,
        lineHeight: 64 / 48,
        fontSize: pxToRem(32),
        ...responsiveFontSizes({ xs: 32, sm: 36, md: 40, lg: 44 })
    },
    h3: {
        fontWeight: 500,
        lineHeight: '42px',
        fontSize: pxToRem(32),
        ...responsiveFontSizes({ xs: 30, sm: 30, md: 30, lg: 32 })
    },
    h4: {
        fontWeight: 500,
        lineHeight: 1.5,
        fontSize: pxToRem(24),
        ...responsiveFontSizes({ xs: 18, sm: 18, md: 20, lg: 24 })
    },
    h5: {
        fontWeight: 500,
        lineHeight: 1.5,
        fontSize: pxToRem(18),
        ...responsiveFontSizes({ xs: 17, sm: 19, md: 20, lg: 20 })
    },
    h6: {
        fontWeight: 500,
        lineHeight: '18px',
        fontSize: pxToRem(18),
        textTransform: 'uppercase',
        ...responsiveFontSizes({ xs: 14, sm: 14, md: 16, lg: 18 })
    },
    subtitle1: {
        fontWeight: 600,
        lineHeight: 1.5,
        fontSize: pxToRem(16)
    },
    subtitle2: {
        fontWeight: 600,
        lineHeight: 22 / 14,
        fontSize: pxToRem(14)
    },
    caption: {
        lineHeight: 1.5,
        fontSize: pxToRem(12)
    },
    overline: {
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: pxToRem(12),
        letterSpacing: 1.1,
        textTransform: 'uppercase'
    },
    button: {
        fontWeight: 500,
        fontSize: pxToRem(18),
        textTransform: 'uppercase'
    }
}

export default typography
