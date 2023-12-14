import { Module } from '@nestjs/common'
import { UsersModule } from '../users'
import SequenceGeneratorController from './sequence-generator.controller'

import SequenceGeneratorService from './sequence-generator.service'


@Module({
    imports: [
        UsersModule
    ],
    controllers: [SequenceGeneratorController],
    providers: [SequenceGeneratorService],
    exports: [SequenceGeneratorService]
})
class SequenceGeneratorModule {}

export default SequenceGeneratorModule