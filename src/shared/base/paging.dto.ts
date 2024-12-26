import { IsNumber, IsPositive, IsString, IsOptional } from "class-validator";
import { Type } from 'class-transformer';

export class PagingDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsString()
  search?: string;
}