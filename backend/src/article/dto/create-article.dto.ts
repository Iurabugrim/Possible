import { Prisma } from '@prisma/client';
import { IsNumber, IsString } from 'class-validator';

export class CreateArticleDto implements Prisma.ArticleWhereInput {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  body: string;

  @IsNumber()
  categoryId: number;

  @IsString()
  imageUrl: string ;
}
