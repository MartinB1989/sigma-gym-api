import { Module } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { PrismaModule } from '../prisma/prisma.module';
@Module({
  controllers: [ClassesController],
  providers: [ClassesService],
  imports: [PrismaModule],
})
export class ClassesModule {}
