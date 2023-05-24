import { Prisma } from '@prisma/client';
import { DecimalJsLike } from '@prisma/client/runtime';

export class Product implements Prisma.ProductUncheckedCreateInput {
  id?: number;
  name: string;
  description?: string;
  price: string | number | Prisma.Decimal | DecimalJsLike;
}
