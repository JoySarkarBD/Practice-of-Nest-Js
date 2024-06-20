import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  /**
   * Create a new user.
   * @param createUserDto - The data transfer object containing user creation details.
   * @returns An object containing status, message, and the newly created user.
   */
  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ status: boolean; message: string; data: Users }> {
    const newUser = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(newUser);
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
  async findAll(): Promise<{
    status: boolean;
    message: string;
    data: Users[];
  }> {
    const data = await this.userRepository.find();
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
  ): Promise<{ status: boolean; message: string; data: Users | null }> {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return {
      status: true,
      message: 'User retrieved successfully',
      data: user,
    };
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
  ): Promise<{ status: boolean; message: string; data: Users | null }> {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      return {
        status: false,
        message: `User with ID ${id} not found`,
        data: null,
      };
    }
    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });
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
  ): Promise<{ status: boolean; message: string; data: Users | null }> {
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      return {
        status: false,
        message: `User with ID ${id} not found`,
        data: null,
      };
    }

    await this.userRepository.remove(user);

    return {
      status: true,
      message: 'User removed successfully',
      data: user,
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
    const result = await this.userRepository.delete(ids);

    return {
      status: true,
      message: `${result.affected} users removed successfully`,
      count: result.affected,
    };
  }
}
