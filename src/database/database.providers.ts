import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService): Promise<typeof mongoose> => {
            const url = configService.get<string>('MONGODB_URL');
            return mongoose.connect(url);
        }
    },
];