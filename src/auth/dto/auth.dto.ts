import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
