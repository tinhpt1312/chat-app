import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';

@Entity({ name: 'message_contents', schema: 'public' })
export class MessageContent {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id!: string;

  @Column({ type: 'bigint', name: 'message_id', nullable: false })
  messageId!: string;

  @ManyToOne(() => Message, (message) => message.id)
  @JoinColumn({
    name: 'message_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_message_contents_messages_message_id',
  })
  message!: Message;

  @Column({ type: 'text', name: 'content', nullable: false })
  content!: string;
}
