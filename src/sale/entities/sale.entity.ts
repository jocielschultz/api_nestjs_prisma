import { Prisma } from '@prisma/client';

export class Sale implements Prisma.SaleUncheckedCreateInput {
  id?: string;
  userId: string;
  createdAt?: string | Date;
  items?: Prisma.ItemsUncheckedCreateNestedManyWithoutSaleInput;
}
