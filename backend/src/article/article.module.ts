import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { PrismaService } from '../prima/prisma.service';
import { RSSParserService } from 'src/RSSParser/rss-parser.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [ArticleController],
  providers: [ArticleService, PrismaService, RSSParserService],
})
export class ArticleModule {}
