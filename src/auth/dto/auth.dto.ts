import {
  IsNotEmpty, IsOptional,
  IsString,
} from 'class-validator';

export class AuthDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
