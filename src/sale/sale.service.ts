import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import * as qr from 'qrcode';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SaleService {
  constructor(private prisma: PrismaService) {
    prisma.$on<any>('query', (event: Prisma.QueryEvent) => {
      console.log('Query: ' + event.query);
      console.log('Params: ' + event.params);
      console.log('Duration: ' + event.duration + 'ms');
    });
  }

  async generateQrCode(id: string) {
    const { total } = await this.findTotalsBySale(id);

    if (total == null || total == 0) {
      throw new HttpException(
        'Nenhum produto encontrado.',
        HttpStatus.NO_CONTENT,
      );
    }

    const infoQrCode = {
      total,
      id,
    };

    const payloadQrCode = JSON.stringify(infoQrCode);

    const qrCodeURL = await qr.toDataURL(`Total Venda: ${payloadQrCode}`);
    console.log(qrCodeURL);

    return qrCodeURL;
  }

  create(createSaleDto: CreateSaleDto) {
    return 'This action adds a new sale';
  }

  findAll() {
    return `This action returns all sale`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  async findTotalsBySale(id: string) {
    /*const result = await this.prisma.items.groupBy({
      by: ['saleId'],
      _sum: {
        amount: true,
      },
      where: {
        saleId: id,
      },
    });*/

    const result = await this.prisma.items.findMany({
      include: {
        product: {
          select: {
            price: true,
          },
        },
      },
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

    const totalVenda = result.reduce((total, item, index) => {
      return (total += Number(item.product.price) * item.amount);
    }, 0);

    return {
      total: totalVenda,
    };
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
