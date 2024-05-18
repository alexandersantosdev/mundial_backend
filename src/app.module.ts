import { Module, ValidationPipe } from '@nestjs/common';
import { BudgetModule } from './budget/budget.module';
import { APP_PIPE } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    BudgetModule, UserModule, AuthModule],
  providers: [{
    provide: APP_PIPE,
    useClass: ValidationPipe,
  },],
})
export class AppModule { }
