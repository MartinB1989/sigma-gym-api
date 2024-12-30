import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClassesModule } from './modules/classes/classes.module';
import { ClassSchedulesModule } from './modules/class-schedules/class-schedules.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    ClassesModule,
    ClassSchedulesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
