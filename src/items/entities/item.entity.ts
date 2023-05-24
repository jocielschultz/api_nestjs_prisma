import { Prisma } from '@prisma/client';

export class Item implements Prisma.ItemsUncheckedCreateWithoutSaleInput {
  id?: string;
  productId: number;
  amount: number;
  createdAt?: string | Date;
}
