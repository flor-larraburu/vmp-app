import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from '../../../libs/domain/src/entities/sensor.entity';
import { IngestionService } from './ingewstion.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : 5432,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DB || 'tfgdb',
      entities: [Sensor],
      synchronize: true, // Solo para desarrollo
    }),
    TypeOrmModule.forFeature([Sensor]),
  ],
  providers: [IngestionService],
})
export class AppModule {}
