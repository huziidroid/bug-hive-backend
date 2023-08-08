import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

import { toInt } from 'src/shared';

export class FindAllQueryParams {
  @Transform(({ value }) => toInt(value))
  @IsNumber()
  @IsOptional()
  page: number;

  @Transform(({ value }) => toInt(value))
  @IsNumber()
  @IsOptional()
  perPage: number;
}
