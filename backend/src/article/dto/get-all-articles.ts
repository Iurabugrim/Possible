import { IsNumber, IsOptional, IsString } from 'class-validator';

export class getAllArticlesDto {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  perPage?: number;

  @IsOptional()
  @IsString()
  searchTerm?: string;

  @IsOptional()
  @IsString()
  category?: string;
}
