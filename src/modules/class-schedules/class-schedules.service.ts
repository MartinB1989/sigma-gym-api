import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassScheduleDto } from './dto/create-class-schedule.dto';
import { UpdateClassSchedulesDto } from './dto/update-class-schedules.dto';

@Injectable()
export class ClassSchedulesService {
  constructor(private prisma: PrismaService) {}

  async create(createClassScheduleDto: CreateClassScheduleDto) {
    // Verificar si la clase existe
    const classExists = await this.prisma.className.findUnique({
      where: { id: createClassScheduleDto.classId },
    });

    if (!classExists) {
      throw new NotFoundException('La clase no existe');
    }

    return this.prisma.classSchedule.create({
      data: createClassScheduleDto,
      include: {
        class: true,
      },
    });
  }

  async findByClassId(classId: string) {
    return this.prisma.classSchedule.findMany({
      where: { classId },
    });
  }

  async updateMany(updateClassSchedulesDto: UpdateClassSchedulesDto) {
    const { schedules } = updateClassSchedulesDto;

    // Separar los horarios entre actualizaciones y creaciones
    const schedulesToUpdate = schedules.filter((schedule) => schedule.id);
    const schedulesToCreate = schedules.filter((schedule) => !schedule.id);

    const operations = [
      // Actualizaciones
      ...schedulesToUpdate.map((schedule) =>
        this.prisma.classSchedule.update({
          where: { id: schedule.id },
          data: {
            weekDay: schedule.weekDay,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            active: schedule.active ?? true,
          },
        }),
      ),
      // Creaciones
      ...schedulesToCreate.map((schedule) =>
        this.prisma.classSchedule.create({
          data: {
            classId: schedule.classId!,
            weekDay: schedule.weekDay,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            active: schedule.active ?? true,
          },
        }),
      ),
    ];

    return this.prisma.$transaction(operations);
  }

  async remove(id: string) {
    const schedule = await this.prisma.classSchedule.findUnique({
      where: { id },
    });

    if (!schedule) {
      throw new NotFoundException('El horario no existe');
    }

    return this.prisma.classSchedule.delete({
      where: { id },
    });
  }
}
