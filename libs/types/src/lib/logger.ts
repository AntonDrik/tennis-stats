import { Chalk } from 'chalk'


export interface ILoggerService {
    log(message: string, format?: Chalk, newLine?: boolean): void
    
    error(message: string): void
    
    warn(message: string, newLine?: boolean): void
    
    app(message: string, format?: Chalk, newLine?: boolean): void
    
    debug(message: string, format?: Chalk, newLine?: boolean): void
    
    time(message: string, newLine?: boolean): void
    
    timeEnd(message: string, newLine?: boolean): void
}