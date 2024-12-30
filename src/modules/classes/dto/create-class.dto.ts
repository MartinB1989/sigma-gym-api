import { IsString, IsInt, IsOptional, Min } from 'class-validator';

export class CreateClassDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @Min(1)
  capacity: number;
}
