import { IsString, IsUUID } from 'class-validator';

export class IdParamDto {
  @IsUUID()
  @IsString()
  readonly id: string;
}
