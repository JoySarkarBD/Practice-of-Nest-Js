import { Transform } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class IdParamDto {
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsInt()
  @IsPositive()
  readonly id: number;
}
