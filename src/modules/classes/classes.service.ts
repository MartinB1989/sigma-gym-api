import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  async create(createClassDto: CreateClassDto) {
    return this.prisma.className.create({
      data: createClassDto,
    });
  }

  async update(id: string, updateClassDto: UpdateClassDto) {
    return this.prisma.className.update({
      where: { id },
      data: updateClassDto,
    });
  }

  async findAllWithSchedules() {
    return this.prisma.className.findMany({
      include: {
        schedules: true,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.$transaction(async (tx) => {
      await tx.classSchedule.deleteMany({
        where: { classId: id },
      });
      
      return tx.className.delete({
        where: { id },
      });
    });
  }
}
