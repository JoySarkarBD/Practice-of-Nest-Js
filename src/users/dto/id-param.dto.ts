import { Transform } from 'class-transformer';
import { IsMongoId } from 'class-validator';

export class IdParamDto {
  @Transform(({ value }) => value.toString(), { toClassOnly: true })
  @IsMongoId()
  readonly id: string;
}
