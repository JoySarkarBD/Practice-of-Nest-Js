import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Create a new user.
   * @param createUserDto - The data transfer object containing user creation details.
   * @returns An object containing status, message, and the newly created user.
   */
  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ status: boolean; message: string; data: User }> {
    const createdUser = new this.userModel(createUserDto);
    const savedUser = await createdUser.save();

    return {
      status: true,
      message: 'User created successfully',
      data: savedUser,
    };
  }

  /**
   * Retrieve all users.
   * @returns An object containing status, message, and an array of all users.
   */
  async findAll(): Promise<{ status: boolean; message: string; data: User[] }> {
    const data = await this.userModel.find().exec();
    const message =
      data.length > 0 ? 'Users retrieved successfully' : 'No users found';
    return { status: true, message, data };
  }

  /**
   * Retrieve a specific user by ID.
   * @param id - The ID of the user to retrieve.
   * @returns An object containing status, message, and the user with the specified ID or an error message if not found.
   */
  async findOne(
    id: string,
  ): Promise<{ status: boolean; message: string; data: User | null }> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      return {
        status: false,
        message: `User with ID ${id} not found`,
        data: null,
      };
    }
    return { status: true, message: 'User retrieved successfully', data: user };
  }

  /**
   * Update a specific user by ID.
   * @param id - The ID of the user to update.
   * @param updateUserDto - The data transfer object containing updated user details.
   * @returns An object containing status, message, and the updated user or an error message if not found.
   */
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ status: boolean; message: string; data: User | null }> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      return {
        status: false,
        message: `User with ID ${id} not found`,
        data: null,
      };
    }
    return {
      status: true,
      message: 'User updated successfully',
      data: updatedUser,
    };
  }

  /**
   * Remove a specific user by ID.
   * @param id - The ID of the user to remove.
   * @returns An object containing status, message, and the removed user or an error message if not found.
   */
  async remove(
    id: string,
  ): Promise<{ status: boolean; message: string; data: User | null }> {
    const removedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!removedUser) {
      return {
        status: false,
        message: `User with ID ${id} not found`,
        data: null,
      };
    }
    return {
      status: true,
      message: 'User removed successfully',
      data: removedUser,
    };
  }

  /**
   * Remove multiple users by IDs.
   * @param ids - An array of user IDs to remove.
   * @returns An object containing status and a message.
   */
  async removeMultiple(
    ids: string[],
  ): Promise<{ status: boolean; message: string; count: number }> {
    const result = await this.userModel.deleteMany({ _id: { $in: ids } });
    return {
      status: true,
      message: `${result.deletedCount} users removed successfully`,
      count: result.deletedCount,
    };
  }
}
