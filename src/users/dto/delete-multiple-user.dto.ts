import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsMongoId } from 'class-validator';

export class DeleteMultipleUsersDto {
  @ApiProperty({
    description: 'An array of user IDs to delete',
    example: ['60b8d6c1d5d4c505f8b0b4d5', '60b8d6c1d5d4c505f8b0b4d6'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  readonly ids: string[];
}
