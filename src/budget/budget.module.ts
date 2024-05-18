import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { budgetsProviders } from './budget.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BudgetController],
  providers: [BudgetService, ...budgetsProviders],
})
export class BudgetModule { }
