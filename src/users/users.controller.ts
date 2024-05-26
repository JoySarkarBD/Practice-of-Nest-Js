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
   * @param idParamDto - The DTO containing the ID of the user to retrieve.
   * @returns The user with the specified ID.
   */
  @Get('/:id')
  @UsePipes(new ValidationPipe())
  findOne(@Param() idParamDto: IdParamDto) {
    return this.usersService.findOne(idParamDto.id);
  }

  /**
   * Update a specific user by ID.
   * @param idParamDto - The DTO containing the ID of the user to update.
   * @param updateUserDto - The data transfer object containing updated user details.
   * @returns The updated user.
   */
  @Patch('/:id')
  @UsePipes(new ValidationPipe())
  update(
    @Param() idParamDto: IdParamDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(idParamDto.id, updateUserDto);
  }

  /**
   * Remove a specific user by ID.
   * @param idParamDto - The DTO containing the ID of the user to remove.
   * @returns The removed user.
   */
  @Delete('/:id')
  @UsePipes(new ValidationPipe())
  remove(@Param() idParamDto: IdParamDto) {
    return this.usersService.remove(idParamDto.id);
  }
}
