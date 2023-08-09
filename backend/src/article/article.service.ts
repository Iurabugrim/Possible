import {Injectable, Logger, NotFoundException} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { getAllArticlesDto } from './dto/get-all-articles';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prima/prisma.service';
import { RSSParserService } from 'src/RSSParser/rss-parser.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService, private rssParser: RSSParserService ) {}

  @Cron('* * 6 * * *')
  async generateRssArticles() {
    try {
      const url = process.env.RSS_URL
      if (url) {
        const feedItems = await this.rssParser.parseRSSFeed(url)
        for (const item of feedItems) {

          console.log(item.title)
          
          await this.prisma.article.create({
            data: {
              title: item.title,
              description: item.link,
              body: item.content,
              imageUrl: item.enclosure.url,
              category:{ 
                connect: {
                  id: 1
                }
              }
            }
          })
        }
      }
    }catch (e) {
      throw new Error(e)
    }
  }

  async create(createArticleDto: CreateArticleDto) {
    try {

      const sameArticle = await this.prisma.article.findUnique({
        where: {
          title: createArticleDto.title,
        },
      });

      if (sameArticle) {
        throw new Error('Article already exists');
      }

      return await this.prisma.article.create({
        data: {
          title: createArticleDto.title,
          description: createArticleDto.description,
          body: createArticleDto.body,
          imageUrl: createArticleDto.imageUrl,
          category: {
            connect: {
              id: +createArticleDto.categoryId,
            },
          },
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async findAll(dto: getAllArticlesDto) {
    try {
      const { searchTerm, category, perPage, page } = dto;

      const prismaSearch: Prisma.ArticleWhereInput =
        category && searchTerm
          ? {
              OR: [
                {
                  category: {
                    value: {
                      contains: category,
                      mode: 'insensitive',
                    },
                  },
                },
                {
                  title: {
                    contains: searchTerm,
                    mode: 'insensitive',
                  },
                  category: {
                    value: category,
                  },
                },
                {
                  description: {
                    contains: searchTerm,
                    mode: 'insensitive',
                  },
                  category: {
                    value: category,
                  },
                },
                {
                  body: {
                    contains: searchTerm,
                    mode: 'insensitive',
                  },
                  category: {
                    value: category,
                  },
                },
              ],
            }
          : category
          ? {
              category: {
                value: category,
              },
            }
          : searchTerm
          ? {
              OR: [
                {
                  title: {
                    contains: searchTerm,
                    mode: 'insensitive',
                  },
                },
                {
                  description: {
                    contains: searchTerm,
                    mode: 'insensitive',
                  },
                },
                {
                  body: {
                    contains: searchTerm,
                    mode: 'insensitive',
                  },
                },
              ],
            }
          : {};

      const curPage = page ? page : 1;
      const skip = perPage ? (curPage - 1) * perPage : 0;

      const articles = await this.prisma.article.findMany({
        skip: skip,
        take: perPage || 20,
        where: prismaSearch,
        include: {
          category: true
        }
      });

      return {
        articles,
        length: await this.prisma.article.count({
        where: prismaSearch,
        }),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async findOne(id: number) {
    try {
      const article = await this.prisma.article.findUnique({
        where: {
          id: id,
        },
        include: {
          category: true
        }
      });

      if (!article) new NotFoundException('Artcle not found');

      return article;
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    try {
      const article = await this.prisma.article.findUnique({where: {id}})

      if (!article) throw new Error('Article not found')

      return await this.prisma.article.update({
        where: {id},
        data: {
          ...updateArticleDto
        }
      })
    }catch(e) {
      throw new Error(e)
    }
  }

  async remove(id: number) {
    try {
      const article = await this.prisma.article.findUnique({
        where: {id: id}
      })

      if (!article)  throw new Error('Article not found');

      await this.prisma.article.delete({where: {id: article.id}})

      return article
    }catch (e) {
      throw new Error(e);
    }
  }
}
