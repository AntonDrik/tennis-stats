import { ILoggerService } from '@tennis-stats/types'
import chalk from 'chalk'
import { Chalk } from 'chalk'
import fs from 'fs'
import { join } from 'path'


export default class LoggerService implements ILoggerService {
    
    constructor(private context: string) {
    }
    
    public log(message: string, format?: Chalk, newLine?: boolean): void {
        if (this.skipNestLogs()) {
            return
        }
        this.formattedLog('info', message, format, newLine)
    }
    
    public error(message: string): void {
        this.formattedLog('error', message, undefined)
    }
    
    public warn(message: string, newLine?: boolean): void {
        this.formattedLog('warn', message, undefined, newLine)
    }
    
    public app(message: string, format?: Chalk, newLine?: boolean): void {
        this.formattedLog('app', message, format, newLine)
    }
    
    public debug(message: string, format?: Chalk | undefined, newLine?: boolean): void {
        if (JSON.parse(process.env.LOG_DEBUG || '')) {
            this.formattedLog('debug', message, format, newLine)
        }
    }
    
    public time(message: string, newLine?: boolean) {
        this.formattedLog('time', message, undefined, newLine)
    }
    
    public timeEnd(message: string, newLine?: boolean) {
        this.formattedLog('timeEnd', message, undefined, newLine)
    }
    
    private skipNestLogs(): boolean {
        return this.context === 'Nest'
    }
    
    private formattedLog(level: string, message: string, format?: Chalk | undefined, newLine?: boolean): void {
    
        fs.appendFile(
            `${join(__dirname)}/assets/server-log.txt`,
            `\n ${new Date()} [${level}]: ${JSON.stringify(message)}`,
            (err) => {
                if (err) {
                    console.log(err)
                }
            })
        
        const context = chalk.magenta(this.context)
        const formattedMessage = typeof format === 'function' ? format(message) : message
        
        switch (level) {
            case 'info':
                console.log(`${newLine ? '\n' : ''}[${chalk.blue('INFO')} | ${context}] ${formattedMessage}`)
                break
            case 'error':
                console.log(`[${chalk.red('ERR')}  | ${context}] ${chalk.red(message)}`)
                break
            case 'warn':
                console.log(`${newLine ? '\n' : ''}[${chalk.yellow('WARN')} | ${context}] ${chalk.yellow(message)}`)
                break
            case 'app':
                console.log(`${newLine ? '\n' : ''}[${chalk.blue('APP')}  | ${context}] ${formattedMessage}`)
                break
            case 'debug':
                console.log(`${newLine ? '\n' : ''}[${chalk.bgGreenBright.green('DEBUG')} | ${context}] ${formattedMessage}`)
                break
            case 'time':
                console.time(`${newLine ? '\n' : ''}[${chalk.bgBlue.green('TIME')} | ${context}] ${chalk.blue(message)}`)
                break
            case 'timeEnd':
                console.timeEnd(`${newLine ? '\n' : ''}[${chalk.bgBlue.green('TIME')} | ${context}] ${chalk.blue(message)}`)
                break
            default:
                break
        }
    }
}
