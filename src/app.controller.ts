import { Controller, Get, Post } from "@nestjs/common";

@Controller()
export class AppController {

    @Get()
    ping() {
        return 'pong';
    }
}