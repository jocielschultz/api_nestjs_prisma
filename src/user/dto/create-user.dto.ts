import { Prisma } from '@prisma/client';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto implements Prisma.UserUncheckedCreateInput {
  //id?: string;
  name: string;

  @IsNotEmpty({
    message: 'Informe o e-mail.',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty({
    message: 'Informe a senha.',
  })
  password: string;
}
