import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
      },
    });
  }

  async findAll(): Promise<Product[]> {
    const result = await this.prisma.product.findMany();

    if (result == null || result.length == 0) {
      throw new HttpException(
        'Nenhum produto encontrado.',
        HttpStatus.NO_CONTENT,
      );
    }

    return result;
  }

  async findOne(id: number) {
    const result = await this.prisma.product.findUnique({
      where: { id },
    });

    if (result === null) {
      throw new HttpException(
        'O produto não foi encontrado.',
        HttpStatus.NO_CONTENT,
      );
    }

    return result;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.updateMany({
      data: {
        name: updateProductDto.name,
        description: updateProductDto.description,
        price: updateProductDto.price,
      },
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.prisma.product.delete({
      where: { id },
    });
  }
}
