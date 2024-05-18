import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { hashSync } from 'bcrypt';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UserService {

  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,) {
  }
  async create(createUserDto: CreateUserDto) {
    createUserDto.password = hashSync(createUserDto.password, 10);
    await this.userModel.create(createUserDto);
    return;
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findOne(id: string, userId: string): Promise<GetUserDto> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new HttpException('User not found', 404);
    if (user.id !== userId) throw new HttpException('User not found', 404);
    const result = new GetUserDto(user.id, user.name, user.email);
    return result
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) throw new HttpException('User not found', 404);
    return user
  }

  async update(id: string, userId: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id, userId);
    return this.userModel.findOneAndUpdate({ _id: id }, updateUserDto);
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    this.userModel.findOneAndDelete({ _id: id });
    return;
  }
}
