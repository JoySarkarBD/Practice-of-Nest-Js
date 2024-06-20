import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'First name of the user',
    minLength: 3,
    maxLength: 20,
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  readonly firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    minLength: 3,
    maxLength: 20,
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  readonly lastName: string;

  @ApiProperty({
    description: 'Username of the user',
    minLength: 3,
    maxLength: 20,
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  readonly username: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'Password for the user account',
    minLength: 6,
    maxLength: 20,
    example: 'strongpassword123',
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  readonly password: string;
}
