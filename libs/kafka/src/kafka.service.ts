import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService {
  private kafka = new Kafka({
    clientId: 'tfg-vmp-client',
    brokers: ['localhost:9092'],
  });

  private producer = this.kafka.producer();
  private consumer = this.kafka.consumer({ groupId: 'tfg-vmp-group' });

  async connect() {
    await this.producer.connect();
    await this.consumer.connect();
  }

  async sendMessage(topic: string, message: string) {
    await this.producer.send({
      topic,
      messages: [{ value: message }],
    });
  }

  async subscribe(topic: string, callback: (msg: string) => void) {
    await this.consumer.subscribe({ topic, fromBeginning: true });
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        if (message.value) callback(message.value.toString());
      },
    });
  }
}
