import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create a new user.
   * @param createUserDto - The data transfer object containing user creation details.
   * @returns The newly created user.
   */
  @Post('/create-user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Retrieve all users.
   * @returns A list of all users.
   */
  @Get('/get-all-users')
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Retrieve a specific user by ID.
   * @param id - The ID of the user to retrieve.
   * @returns The user with the specified ID.
   */
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id); // The '+' converts the id string to a number
  }

  /**
   * Update a specific user by ID.
   * @param id - The ID of the user to update.
   * @param updateUserDto - The data transfer object containing updated user details.
   * @returns The updated user.
   */
  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto); // The '+' converts the id string to a number
  }

  /**
   * Remove a specific user by ID.
   * @param id - The ID of the user to remove.
   * @returns The removed user.
   */
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id); // The '+' converts the id string to a number
  }
}
