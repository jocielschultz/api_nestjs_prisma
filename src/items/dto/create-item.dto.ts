import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsPositive } from 'class-validator';

export type ItemsUncheckedSaleCreateInput = {
  id?: string;
  saleId?: string;
  productId: number;
  amount: number;
  createdAt?: Date | string;
};

export class CreateItemDto implements ItemsUncheckedSaleCreateInput {
  saleId?: string;
  id?: string;

  @IsNotEmpty({
    message: 'Informe o produto.',
  })
  @IsPositive({
    message: 'O produto deve ser um número.',
  })
  productId: number;

  @ApiProperty({
    description: 'Informe a quantidade.',
    default: 1,
  })
  @IsPositive({
    message: 'A quantidade deve ser um número positivo.',
  })
  amount: number;

  createdAt?: string | Date;

  /*@IsNotEmpty({
    message: 'Informe o vendedor.',
  })*/
  userId?: string;

  sale: Prisma.SaleCreateNestedManyWithoutUserInput;
}
