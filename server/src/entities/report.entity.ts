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

@Entity({ name: 'reports', schema: 'public' })
export class Report {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id!: string;

  @Column({ type: 'varchar', length: 50, name: 'type', nullable: false })
  type!: string; // MESSAGE hoặc USER

  @Column({ type: 'bigint', name: 'reported_message_id', nullable: true })
  reportedMessageId!: string | null;

  @ManyToOne(() => Message)
  @JoinColumn({
    name: 'reported_message_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_reports_messages_reported_message_id',
  })
  reportedMessage!: Message | null;

  @Column({ type: 'bigint', name: 'reported_user_id', nullable: true })
  reportedUserId!: string | null;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'reported_user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_reports_users_reported_user_id',
  })
  reportedUser!: User | null;

  @Column({ type: 'bigint', name: 'reporter_id', nullable: false })
  reporterId!: string;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'reporter_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_reports_users_reporter_id',
  })
  reporter!: User;

  @Column({ type: 'text', name: 'reason', nullable: false })
  reason!: string;

  @Column({ type: 'varchar', length: 50, name: 'status', nullable: false })
  status!: string; // PENDING, RESOLVED, REJECTED

  @Column(() => Timestamp, { prefix: false })
  timestamp!: Timestamp;
}
