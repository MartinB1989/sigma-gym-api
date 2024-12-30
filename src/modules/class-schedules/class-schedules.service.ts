import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassScheduleDto } from './dto/create-class-schedule.dto';

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
}
