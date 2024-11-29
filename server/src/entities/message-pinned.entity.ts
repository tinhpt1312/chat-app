import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';
import { User } from './user.entity';
import { Group } from './group.entity';
import { Timestamp } from './common';

@Entity({ name: 'pinned_messages', schema: 'public' })
export class MessagePinned {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id!: string;

  @Column({ type: 'bigint', name: 'message_id', nullable: false })
  messageId!: string;

  @ManyToOne(() => Message)
  @JoinColumn({
    name: 'message_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_pinned_messages_messages_message_id',
  })
  message!: Message;

  @Column({ type: 'bigint', name: 'group_id', nullable: true })
  groupId!: string;

  @ManyToOne(() => Group)
  @JoinColumn({
    name: 'group_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_pinned_messages_groups_group_id',
  })
  group!: Group;

  @Column({ type: 'bigint', name: 'pinned_by', nullable: false })
  pinnedById!: string;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'pinned_by',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_pinned_messages_users_pinned_by',
  })
  pinnedBy!: User;

  @Column(() => Timestamp, { prefix: false })
  timestamp!: Timestamp;
}
