import { Kafka } from 'kafkajs';

export const kafka = new Kafka({
  clientId: 'tfg-vmp-backend',
  brokers: ['localhost:9092'],  // En docker-compose levantamos Kafka en el puerto 9092
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: 'ingestion-group' });
