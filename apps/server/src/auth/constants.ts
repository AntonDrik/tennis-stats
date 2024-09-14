import ms from 'ms'


const ACCESS_COOKIE_LIFE_TIME = '5m'
const REFRESH_COOKIE_LIFE_TIME = '7d'

const ACCESS_COOKIE_NAME = 'Authentication'
const REFRESH_COOKIE_NAME = 'Refresh'


const accessCookieOptions = (lifeTime: string) => ({
    httpOnly: true,
    maxAge: ms(lifeTime)
})

const refreshCookieOptions = (lifeTime: string) => ({
    httpOnly: true,
    maxAge: ms(lifeTime),
    path: '/api/auth/refresh'
})

export {
    accessCookieOptions,
    refreshCookieOptions,
    ACCESS_COOKIE_NAME,
    REFRESH_COOKIE_NAME,
    ACCESS_COOKIE_LIFE_TIME,
    REFRESH_COOKIE_LIFE_TIME
}