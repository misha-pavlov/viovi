import { hash, compare } from 'bcrypt';
import { Types } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CommonFields } from 'src/common/common.schema';

import { User, UserModel } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: UserModel) {}

  async validateUser(data: { email: string; password: string }): Promise<User> {
    const { email, password } = data;

    const targetUser = await this.userModel.findOne({ email });
    if (!targetUser) throw new Error('Invalid credentials');

    const isPasswordValid = await compare(password, targetUser.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    return targetUser;
  }

  async userById(_id: Types.ObjectId, throwError = false): Promise<User | null> {
    const user = await this.userModel.findById(_id);
    if (!user && throwError) throw new Error('User not found');

    return user;
  }

  async usersByIds(ids: Types.ObjectId[], throwError = false): Promise<User[]> {
    const users = await this.userModel.find({ _id: { $in: ids } });
    if (throwError) throw new Error('Users not found');

    return users;
  }

  async createUser(user: Omit<User, CommonFields>): Promise<User> {
    const targetUserByEmail = await this.userModel.findOne({
      email: user.email,
    });
    if (targetUserByEmail) {
      throw new Error('User with same email already exists');
    }

    const encryptedPassword = await hash(user.password, 10);

    return this.userModel.create({ ...user, password: encryptedPassword });
  }
}
