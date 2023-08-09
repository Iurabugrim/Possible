import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prima/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const samecategory = await this.prisma.category.findUnique({where: {value: createCategoryDto.value}})

      if (samecategory) throw new Error("Category already exists")

      return await this.prisma.category.create({
        data: {
          value: createCategoryDto.value,
          label: createCategoryDto.label,
          color: createCategoryDto.color
        }
      })
    }catch (e ) {
      throw new Error(e)
    }
  }

  async findAll() {
    try{
      return await this.prisma.category.findMany()
    }catch(e){
      throw new Error(e)
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.prisma.category.findUnique({where: {id: id}})

      if (!category) throw new Error("Category not found")

      return category
    }catch(e){
      throw new Error(e)
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try{
      const category = await this.prisma.category.findUnique({where: {id}})

      if(!category) throw new Error("Category not found")

      return await this.prisma.category.update({
        where: {id},
        data: {
          ...updateCategoryDto
        }
      })
    }catch(e) {
      throw new Error(e)
    }
  }

  async remove(id: number) {
      try {
        const category = await this.prisma.category.findUnique({where: {id: id}})

        if (!category) throw new Error("Category not found")

        return await this.prisma.category.delete({where: {id: category.id}})
      }catch(e) {
        throw new Error(e)
      }
  }
}
