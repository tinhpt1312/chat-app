import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Timestamp } from './common';

@Entity({ name: 'user_blocks', schema: 'public' })
export class UserBlock {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id!: string;

  @Column({ type: 'bigint', name: 'blocker_id', nullable: false })
  blockerId!: string;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'blocker_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_user_blocks_users_blocker_id',
  })
  blocker!: User;

  @Column({ type: 'bigint', name: 'blocked_id', nullable: false })
  blockedId!: string;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'blocked_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_user_blocks_users_blocked_id',
  })
  blocked!: User;

  @Column({ type: 'text', name: 'reason', nullable: true })
  reason?: string;

  @Column(() => Timestamp, { prefix: false })
  timestamp!: Timestamp;
}
