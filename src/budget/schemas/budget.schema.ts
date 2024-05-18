import * as mongoose from 'mongoose';

export const BudgetSchema = new mongoose.Schema({
    userId: String,
    number: Number,
    client: String,
    phone: String,
    amount: Number,
    status: String,
    date: Date,
    validateUntil: Date,
    items: [{
        name: String,
        price: Number,
        quantity: Number
    }],
    note: String
});