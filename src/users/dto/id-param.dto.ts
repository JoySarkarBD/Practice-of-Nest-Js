import { IsString, IsUUID } from 'class-validator';

export class IdParamDto {
  @IsUUID('4')
  @IsString()
  readonly id: string;
}
