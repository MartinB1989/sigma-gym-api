import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { IsEnum, IsString, IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { WeekDay } from '@prisma/client';

export class UpdateClassScheduleItemDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  classId?: string;

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

export class UpdateClassSchedulesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateClassScheduleItemDto)
  schedules: UpdateClassScheduleItemDto[];
} 