import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    if (
      await this.prisma.user.findFirst({
        where: {
          email: createUserDto.email,
        },
      })
    ) {
      throw new HttpException(
        'O e-mail já foi cadastrado.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
      },
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  async findByEmail(email: string) {
    const result = await this.prisma.user.findFirst({
      where: { email },
    });

    if (result === null) {
      throw new HttpException('E-mail não cadastrado.', HttpStatus.NO_CONTENT);
    }

    return result;
  }

  async findOne(id: number) {
    /*const result = await this.prisma.user.findUnique({
      where: { email },
    });

    if (result === null) {
      throw new HttpException(
        'O produto não foi encontrado.',
        HttpStatus.NO_CONTENT,
      );
    }

    return result;*/
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
