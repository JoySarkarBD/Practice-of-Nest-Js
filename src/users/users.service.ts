import { Injectable, NotFoundException } from '@nestjs/common';
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
   * @returns The newly created user.
   */
  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: this.nextId++, // Assign a unique ID to the new user
      ...createUserDto, // Spread the properties from the DTO
    };
    this.users.push(newUser); // Add the new user to the array
    return newUser; // Return the newly created user
  }

  /**
   * Retrieve all users.
   * @returns An array of all users.
   */
  findAll(): User[] {
    return this.users; // Return the array of all users
  }

  /**
   * Retrieve a specific user by ID.
   * @param id - The ID of the user to retrieve.
   * @returns The user with the specified ID.
   * @throws NotFoundException if the user with the given ID is not found.
   */
  findOne(id: number): User {
    const user = this.users.find((user) => user.id === id); // Find the user by ID
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`); // Throw an exception if the user is not found
    }
    return user; // Return the found user
  }

  /**
   * Update a specific user by ID.
   * @param id - The ID of the user to update.
   * @param updateUserDto - The data transfer object containing updated user details.
   * @returns The updated user.
   * @throws NotFoundException if the user with the given ID is not found.
   */
  update(id: number, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex((user) => user.id === id); // Find the user index by ID
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`); // Throw an exception if the user is not found
    }
    const updatedUser = { ...this.users[userIndex], ...updateUserDto }; // Merge the existing user data with the updated data
    this.users[userIndex] = updatedUser; // Update the user in the array
    return updatedUser; // Return the updated user
  }

  /**
   * Remove a specific user by ID.
   * @param id - The ID of the user to remove.
   * @returns The removed user.
   * @throws NotFoundException if the user with the given ID is not found.
   */
  remove(id: number): User {
    const userIndex = this.users.findIndex((user) => user.id === id); // Find the user index by ID
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`); // Throw an exception if the user is not found
    }
    const removedUser = this.users.splice(userIndex, 1); // Remove the user from the array
    return removedUser[0]; // Return the removed user
  }
}