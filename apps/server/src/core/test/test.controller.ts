import { Controller, Get } from '@nestjs/common'


@Controller('test')
export default class TestController {
    constructor() {}
    
    @Get()
    getHelloWorldMessage() {
        return 'Будем ебашить статистику'
    }
}