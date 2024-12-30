import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { ClassSchedulesService } from './class-schedules.service';
import { CreateClassScheduleDto } from './dto/create-class-schedule.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('class-schedules')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClassSchedulesController {
  constructor(private readonly classSchedulesService: ClassSchedulesService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createClassScheduleDto: CreateClassScheduleDto) {
    return this.classSchedulesService.create(createClassScheduleDto);
  }

  @Get('class/:classId')
  findByClassId(@Param('classId') classId: string) {
    return this.classSchedulesService.findByClassId(classId);
  }
}
