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
import { CreateUserDto } from './dto/create-user.dto';
import { IdParamDto } from './dto/id-param.dto';
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
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  /**
   * Retrieve all users.
   * @returns A list of all users.
   */
  @Get('/get-all-users')
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
  async update(
    @Param() idParamDto: IdParamDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(idParamDto.id, updateUserDto);
  }

  /**
   * Remove a specific user by ID.
   * @param idParamDto - The DTO containing the ID of the user to remove.
   * @returns The removed user.
   */
  @Delete('/:id')
  @UsePipes(new ValidationPipe())
  async remove(@Param() idParamDto: IdParamDto) {
    return await this.usersService.remove(idParamDto.id);
  }
}
