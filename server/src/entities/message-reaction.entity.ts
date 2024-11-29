import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';
import { User } from './user.entity';
import { Timestamp } from './common';

@Entity({ name: 'message_reactions', schema: 'public' })
export class MessageReaction {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id!: string;

  @Column({ type: 'bigint', name: 'message_id', nullable: false })
  messageId!: string;

  @ManyToOne(() => Message, (message) => message.reactions)
  @JoinColumn({
    name: 'message_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_message_reactions_messages_message_id',
  })
  message!: Message;

  @Column({ type: 'bigint', name: 'user_id', nullable: false })
  userId!: string;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_message_reactions_users_user_id',
  })
  user!: User;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'reaction_type',
    nullable: false,
  })
  reactionType!: string;

  @Column(() => Timestamp, { prefix: false })
  timestamp!: Timestamp;
}
