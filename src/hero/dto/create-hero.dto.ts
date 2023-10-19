import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsAlpha, IsString } from 'class-validator';

export class CreateHeroDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

  @IsNotEmpty()
  @IsAlpha()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  avatar: string;
}
