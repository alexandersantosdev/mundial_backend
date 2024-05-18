import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { Model } from 'mongoose';
import { Budget } from './interfaces/budget.interface';

@Injectable()
export class BudgetService {

  constructor(
    @Inject('BUDGET_MODEL')
    private budgetModel: Model<Budget>,) {
  }
  async create(createBudgetDto: CreateBudgetDto): Promise<Budget> {
    createBudgetDto.number = new Date().getTime()
    const createdBudget = new this.budgetModel(createBudgetDto);
    return await createdBudget.save();
  }

  async findAll(userId: string): Promise<Budget[]> {
    return await this.budgetModel.find({ userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<Budget> {
    const budget = await this.budgetModel.findById(id);
    if (!budget) throw new HttpException('Budget not found', 404);
    console.log(budget, userId)
    if (budget.userId !== userId) throw new HttpException('Budget not found', 404);
    return budget;
  }

  async update(id: string, userId: string, updateBudgetDto: UpdateBudgetDto): Promise<Budget> {
    await this.findOne(id, userId);
    return await this.budgetModel.findOneAndUpdate({ _id: id }, updateBudgetDto);
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.findOne(id, userId);
    await this.budgetModel.findOneAndDelete({ _id: id });
    return;
  }

}
