export interface IEnvVariables {
    DOMAIN: string
    PORT: number
    ENVIRONMENT: string
    
    JWT_SECRET_KEY: string
    DB_URL: string
    LOG_DEBUG: boolean
}
