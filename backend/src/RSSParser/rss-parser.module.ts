import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prima/prisma.service';
import { RSSParserService } from './rss-parser.service';

@Module({
  providers: [RSSParserService, PrismaService]
})
export class RSSParserModule {}
