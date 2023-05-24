import { Prisma } from '@prisma/client';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto implements Prisma.UserUncheckedCreateInput {
  //id?: string;
  @IsNotEmpty({
    message: 'Informe o nome.',
  })
  name: string;

  @IsNotEmpty({
    message: 'Informe o e-mail.',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty({
    message: 'Informe a senha.',
  })
  @MinLength(6)
  @MaxLength(64)
  password: string;
}
