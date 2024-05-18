import { Controller, Get, Post } from "@nestjs/common";

@Controller('app')
export class AppController {

    @Get('ping')
    @Post('ping')
    ping() {
        return 'pong';
    }
}