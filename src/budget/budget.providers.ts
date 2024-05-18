import { Connection } from "mongoose";
import { BudgetSchema } from "./schemas/budget.schema";

export const budgetsProviders = [
    {
        provide: 'BUDGET_MODEL',
        useFactory: (connection: Connection) => connection.model('Budget', BudgetSchema),
        inject: ['DATABASE_CONNECTION'],
    }
];