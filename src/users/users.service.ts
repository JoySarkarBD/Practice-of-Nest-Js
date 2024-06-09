import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  /**
   * Create a new user.
   * @param createUserDto - The data transfer object containing user creation details.
   * @returns An object containing status, message, and the newly created user.
   */
  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ status: boolean; message: string; data: User }> {
    const newUser: User = {
      id: this.nextId++, // Assign a unique ID to the new user
      ...createUserDto, // Spread the properties from the DTO
    };
    this.users.push(newUser); // Add the new user to the array
    return {
      status: true,
      message: 'User created successfully',
      data: newUser,
    }; // Return response with status, message, and new user
  }

  /**
   * Retrieve all users.
   * @returns An object containing status, message, and an array of all users.
   */
  async findAll(): Promise<{ status: boolean; message: string; data: User[] }> {
    const data = this.users; // Get all users
    const message =
      data.length > 0 ? 'Users retrieved successfully' : 'No users found'; // Set appropriate message
    return { status: true, message, data }; // Return response with status, message, and users
  }

  /**
   * Retrieve a specific user by ID.
   * @param id - The ID of the user to retrieve.
   * @returns An object containing status, message, and the user with the specified ID or an error message if not found.
   */
  async findOne(
    id: number,
  ): Promise<{ status: boolean; message: string; data: User | null }> {
    const user = this.users.find((user) => user.id === id); // Find the user by ID
    if (!user) {
      return {
        status: false,
        message: `User with ID ${id} not found`,
        data: null,
      }; // Return response if the user is not found
    }
    return { status: true, message: 'User retrieved successfully', data: user }; // Return response with status, message, and found user
  }

  /**
   * Update a specific user by ID.
   * @param id - The ID of the user to update.
   * @param updateUserDto - The data transfer object containing updated user details.
   * @returns An object containing status, message, and the updated user or an error message if not found.
   */
  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<{ status: boolean; message: string; data: User | null }> {
    const userIndex = this.users.findIndex((user) => user.id === id); // Find the user index by ID
    if (userIndex === -1) {
      return {
        status: false,
        message: `User with ID ${id} not found`,
        data: null,
      }; // Return response if the user is not found
    }
    const updatedUser = { ...this.users[userIndex], ...updateUserDto }; // Merge the existing user data with the updated data
    this.users[userIndex] = updatedUser; // Update the user in the array
    return {
      status: true,
      message: 'User updated successfully',
      data: updatedUser,
    }; // Return response with status, message, and updated user
  }

  /**
   * Remove a specific user by ID.
   * @param id - The ID of the user to remove.
   * @returns An object containing status, message, and the removed user or an error message if not found.
   */
  async remove(
    id: number,
  ): Promise<{ status: boolean; message: string; data: User | null }> {
    const userIndex = this.users.findIndex((user) => user.id === id); // Find the user index by ID
    if (userIndex === -1) {
      return {
        status: false,
        message: `User with ID ${id} not found`,
        data: null,
      }; // Return response if the user is not found
    }
    const removedUser = this.users.splice(userIndex, 1); // Remove the user from the array
    return {
      status: true,
      message: 'User removed successfully',
      data: removedUser[0],
    }; // Return response with status, message, and removed user
  }
}
