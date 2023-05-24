import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {
    prisma.$on<any>('query', (event: Prisma.QueryEvent) => {
      console.log('Query: ' + event.query);
      console.log('Params: ' + event.params);
      console.log('Duration: ' + event.duration + 'ms');
    });
  }

  create(createItemDto: CreateItemDto) {
    if (createItemDto.saleId === undefined) {
      return this.prisma.items.create({
        data: {
          amount: createItemDto.amount,
          product: {
            connect: {
              id: createItemDto.productId,
            },
          },
          sale: {
            create: {
              userId: createItemDto.userId,
            },
          },
        },
      });
    } else {
      return this.prisma.items.create({
        data: {
          amount: createItemDto.amount,
          product: {
            connect: {
              id: createItemDto.productId,
            },
          },
          sale: {
            connect: {
              id: createItemDto.saleId,
            },
          },
        },
      });
    }
  }

  async findAll() {
    const result = await this.prisma.items.findMany();

    if (result == null || result.length == 0) {
      throw new HttpException('Nenhum item encontrado.', HttpStatus.NO_CONTENT);
    }

    return result;
  }

  async findOne(id: string) {
    const result = await this.prisma.items.findMany({
      where: {
        saleId: id,
      },
    });

    if (result === null) {
      throw new HttpException(
        'Nenhum produto na venda informada.',
        HttpStatus.NO_CONTENT,
      );
    }

    return result;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
