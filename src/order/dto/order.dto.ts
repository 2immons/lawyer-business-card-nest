import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
} from 'class-validator';

export class OrderDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  serviceTitle: string;

  @IsString()
  @IsNotEmpty()
  clientTask: string;

  @IsString()
  @IsOptional()
  clientName?: string;

  @IsString()
  @IsOptional()
  clientContacts?: string;

  @IsString()
  @IsOptional()
  clientCity?: string;
}
