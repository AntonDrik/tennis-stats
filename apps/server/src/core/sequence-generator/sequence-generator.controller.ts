import { Controller, Get, Post } from '@nestjs/common/decorators'
import SequenceGeneratorService from './sequence-generator.service'


@Controller('/sequence-generator')
class SequenceGeneratorController {
    
    constructor(private service: SequenceGeneratorService) {}
    
    @Get()
    getList() {
    
    }
    
    @Post('/generate')
    generate() {
        return this.service.generate()
    }
}


export default SequenceGeneratorController