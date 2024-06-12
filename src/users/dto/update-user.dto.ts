import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Username of the user',
    minLength: 3,
    maxLength: 20,
    example: 'john_doe',
  })
  @IsString()
  @IsOptional()
  @Length(3, 20)
  readonly username?: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @ApiProperty({
    description: 'Password for the user account',
    minLength: 6,
    maxLength: 20,
    example: 'strongpassword123',
  })
  @IsString()
  @IsOptional()
  @Length(6, 20)
  readonly password?: string;
}
