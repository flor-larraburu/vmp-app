import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sensor } from '../../../libs/domain/src/entities/sensor.entity';

@Injectable()
export class IngestionService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private consumer: Consumer;

  constructor(
    @InjectRepository(Sensor)
    private sensorRepository: Repository<Sensor>,
  ) {
    this.kafka = new Kafka({
      clientId: 'ingestion-service',
      brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
    });
    this.consumer = this.kafka.consumer({ groupId: 'ingestion-group' });
  }

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'sensor-topic', fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        try {
          const sensorData = JSON.parse(message.value?.toString() || '{}');
          console.log('Recibido sensor:', sensorData);

          const sensor = this.sensorRepository.create(sensorData);
          await this.sensorRepository.save(sensor);
        } catch (error) {
          console.error('Error procesando mensaje Kafka:', error);
        }
      },
    });
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
  }
}
