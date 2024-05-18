import { Document } from 'mongoose';

type Item = {
    readonly name: string;
    readonly price: number;
    readonly quantity: number;
}

export interface Budget extends Document {
    readonly userId: string;
    readonly number: number;
    readonly id: string;
    readonly client: string;
    readonly phone: string;
    readonly amount: number;
    readonly status: string;
    readonly date: Date;
    readonly validateUntil: Date;
    readonly items: Item[];
}
