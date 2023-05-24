import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nome do produto.',
  })
  @IsNotEmpty({
    message: 'Informe o nome do produto.',
  })
  @IsString({
    message: 'A descrição deve ser um texto.',
  })
  name: string;

  @MaxLength(240)
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Valor do produto.',
    default: 100,
  })
  @IsPositive({
    message: 'O valor do produto deve ser um número positivo.',
  })
  price: number;
}
