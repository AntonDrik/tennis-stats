import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import * as Joi from 'joi'
import { join } from 'path'
import { IEnvVariables } from './interfaces/variables.interface'


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `${join(__dirname)}/assets/.env`,
            isGlobal: true,
            validationSchema: Joi.object<IEnvVariables>({
                PORT: Joi.number().required(),
                JWT_SECRET_KEY: Joi.string().required(),
                DB_URL: Joi.string().required(),
                LOG_DEBUG: Joi.boolean().required(),
                
                DOMAIN: Joi.string().required(),
            })
        })
    ]
})
export default class EnvConfigModule {}
