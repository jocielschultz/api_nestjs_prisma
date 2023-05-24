import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Product } from '@prisma/client';
import { ProductRepository } from './repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private readonly productRepository: ProductRepository,
  ) {
    prisma.$on<any>('query', (event: Prisma.QueryEvent) => {
      console.log('Query: ' + event.query);
      console.log('Params: ' + event.params);
      console.log('Duration: ' + event.duration + 'ms');
    });
  }

  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.create(createProductDto);
    /*return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
      },
    });*/
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.findAll();
    /*const result = await this.prisma.product.findMany();

    if (result == null || result.length == 0) {
      throw new HttpException(
        'Nenhum produto encontrado.',
        HttpStatus.NO_CONTENT,
      );
    }

    return result;*/
  }

  async findOne(id: number) {
    return await this.productRepository.findOne(id);
    /*const result = await this.prisma.product.findUnique({
      where: { id },
    });

    if (result === null) {
      throw new HttpException(
        'O produto não foi encontrado.',
        HttpStatus.NO_CONTENT,
      );
    }

    return result;
    */
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update(id, updateProductDto);
    /*return this.prisma.product.updateMany({
      data: {
        name: updateProductDto.name,
        description: updateProductDto.description,
        price: updateProductDto.price,
      },
      where: { id },
    });
    */
  }

  async remove(id: number) {
    return await this.productRepository.remove(id);
    /*
    return await this.prisma.product.delete({
      where: { id },
    });*/
  }
}
