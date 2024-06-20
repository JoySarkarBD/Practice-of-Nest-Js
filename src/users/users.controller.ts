import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteMultipleUsersDto } from './dto/delete-multiple-user.dto';
import { IdParamDto } from './dto/id-param.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create a new user.
   * @param createUserDto - The data transfer object containing user creation details.
   * @returns The newly created user.
   */
  @Post('/create-user')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    schema: {
      example: {
        status: true,
        statusCode: 201,
        path: '/users/create-user',
        method: 'POST',
        timestamp: new Date().toISOString(),
        message: 'User created successfully',
        result: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          username: 'john_doe',
          email: 'john.doe@example.com',
          password: 'hashedpassword',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  /**
   * Retrieve all users.
   * @returns A list of all users.
   */
  @Get('/get-all-users')
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({
    status: 200,
    description: 'A list of all users.',
    schema: {
      example: {
        status: true,
        statusCode: 200,
        path: '/users/get-all-users',
        method: 'GET',
        timestamp: new Date().toISOString(),
        message: 'Users retrieved successfully',
        result: [
          {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            username: 'john_doe',
            email: 'john.doe@example.com',
            password: 'hashedpassword',
          },
          {
            id: 2,
            firstName: 'Jane',
            lastName: 'Doe',
            username: 'jane_doe',
            email: 'jane.doe@example.com',
            password: 'hashedpassword',
          },
        ],
      },
    },
  })
  async findAll() {
    return await this.usersService.findAll();
  }

  /**
   * Retrieve a specific user by ID.
   * @param idParamDto - The DTO containing the ID of the user to retrieve.
   * @returns The user with the specified ID.
   */
  @Get('/:id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to retrieve',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The user with the specified ID.',
    schema: {
      example: {
        status: true,
        statusCode: 200,
        path: '/users/1',
        method: 'GET',
        timestamp: new Date().toISOString(),
        message: 'User retrieved successfully',
        result: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          username: 'john_doe',
          email: 'john.doe@example.com',
          password: 'hashedpassword',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
    schema: {
      example: {
        status: false,
        statusCode: 404,
        path: '/users/1',
        method: 'GET',
        timestamp: new Date().toISOString(),
        message: 'User not found',
      },
    },
  })
  async findOne(@Param() idParamDto: IdParamDto) {
    return await this.usersService.findOne(idParamDto.id);
  }

  /**
   * Update a specific user by ID.
   * @param idParamDto - The DTO containing the ID of the user to update.
   * @param updateUserDto - The data transfer object containing updated user details.
   * @returns The updated user.
   */
  @Patch('/:id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to update',
    type: String,
  })
  @ApiBody({
    description: 'The data transfer object containing updated user details',
    schema: {
      example: {
        username: 'new_username',
        email: 'new.email@example.com',
        password: 'newpassword',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The updated user.',
    schema: {
      example: {
        status: true,
        statusCode: 200,
        path: '/users/1',
        method: 'PATCH',

        timestamp: new Date().toISOString(),
        message: 'User updated successfully',
        result: {
          id: 1,
          firstName: 'new_firstName',
          lastName: 'new_lastName',
          username: 'new_username',
          email: 'new.email@example.com',
          password: 'newhashedpassword',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
    schema: {
      example: {
        status: false,
        statusCode: 404,
        path: '/users/1',
        method: 'PATCH',

        timestamp: new Date().toISOString(),
        message: 'User not found',
      },
    },
  })
  async update(
    @Param() idParamDto: IdParamDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(idParamDto.id, updateUserDto);
  }

  /**
   * Remove multiple users by IDs.
   * @param deleteMultipleUsersDto - The DTO containing an array of user IDs to remove.
   * @returns An object containing status, message, and the number of removed users.
   */
  @Delete('/delete-multiple')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Remove multiple users by IDs' })
  @ApiBody({
    description: 'The DTO containing an array of user IDs to remove',
    schema: {
      example: {
        ids: ['60b8d6c1d5d4c505f8b0b4d5', '60b8d6c1d5d4c505f8b0b4d6'],
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The number of users removed successfully.',
    schema: {
      example: {
        status: true,
        statusCode: 200,
        path: '/delete-multiple',
        method: 'DELETE',
        timestamp: new Date().toISOString(),
        message: '2 users removed successfully',
        count: 2,
      },
    },
  })
  async removeMultiple(@Body() deleteMultipleUsersDto: DeleteMultipleUsersDto) {
    return await this.usersService.removeMultiple(deleteMultipleUsersDto.ids);
  }

  /**
   * Remove a specific user by ID.
   * @param idParamDto - The DTO containing the ID of the user to remove.
   * @returns The removed user.
   */
  @Delete('/:id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Remove a user by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user to remove',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The removed user.',
    schema: {
      example: {
        status: true,
        statusCode: 200,
        path: '/users/1',
        method: 'DELETE',
        timestamp: new Date().toISOString(),
        message: 'User removed successfully',
        result: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          username: 'john_doe',
          email: 'john.doe@example.com',
          password: 'hashedpassword',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
    schema: {
      example: {
        status: false,
        statusCode: 404,
        path: '/users/1',
        method: 'DELETE',
        timestamp: new Date().toISOString(),
        message: 'User not found',
      },
    },
  })
  async remove(@Param() idParamDto: IdParamDto) {
    return await this.usersService.remove(idParamDto.id);
  }
}
