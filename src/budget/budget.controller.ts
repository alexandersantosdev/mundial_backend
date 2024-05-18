import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpCode, UseInterceptors, Render, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import handlebars from 'handlebars';
import { AuthGuard } from 'src/auth/auth.guard';
import { Budget } from './interfaces/budget.interface';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) { }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body(new ValidationPipe()) createBudgetDto: CreateBudgetDto, @Req() req: Request): Promise<Budget> {
    const { user } = req;
    createBudgetDto.userId = user.sub
    return await this.budgetService.create(createBudgetDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Req() req: Request) {
    const { user } = req;
    return await this.budgetService.findAll(user.sub);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const { user } = req;
    console.log(user)
    return await this.budgetService.findOne(id, user.sub);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBudgetDto: UpdateBudgetDto, @Req() req: Request) {
    const { user } = req;
    await this.budgetService.update(id, user.sub, updateBudgetDto);
    return
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const { user } = req;
    await this.budgetService.remove(id, user.sub);
    return
  }

  @HttpCode(HttpStatus.OK)
  @Post(':id/pdf')
  @Render('pdfModel')
  async printPdf(@Param('id') id: string, @Req() req: Request) {
    const { user } = req;
    const budget = await this.budgetService.findOne(id, user.sub);
    handlebars.registerHelper('formatMonetary', function (value) {
      const newValue = parseFloat(value).toFixed(2);
      return parseFloat(newValue).toLocaleString('pt-br', { minimumFractionDigits: 2 });
    });
    handlebars.registerHelper('formatDate', function (date) {
      return new Date(date).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: ('long'),
        day: 'numeric',
      });
    });

    budget['dateFormated'] = new Date(budget.date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: ('long'),
      day: 'numeric',
    });

    budget['vDateFormated'] = new Date(budget.validateUntil).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: ('long'),
      day: 'numeric',
    });

    return budget;
  }
}
