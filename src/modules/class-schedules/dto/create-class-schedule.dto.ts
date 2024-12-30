import { IsEnum, IsString, IsBoolean, IsOptional } from 'class-validator';
import { WeekDay } from '@prisma/client';

export class CreateClassScheduleDto {
  @IsString()
  classId: string;

  @IsEnum(WeekDay)
  weekDay: WeekDay;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
