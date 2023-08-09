import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prima/prisma.module';
import { ArticleModule } from './article/article.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { RSSParserModule } from './RSSParser/rss-parser.module';


@Module({
  imports: [
    UserModule,
    AuthModule,
    PrismaModule,
    ArticleModule,
    RSSParserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
