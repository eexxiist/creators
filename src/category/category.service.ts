import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.category.findMany();
  }

  async getById(id: string) {
    const findCategory = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!findCategory) {
      throw new NotFoundException('Категории не существует');
    }

    return findCategory;
  }

  async create(data: CreateCategoryDto) {
    const { name } = data;

    const findCategory = await this.prisma.category.findUnique({
      where: { name },
    });

    if (findCategory) {
      throw new ConflictException('Категория существует');
    }

    const category = await this.prisma.category.create({ data: { name } });
    return category;
  }
}
