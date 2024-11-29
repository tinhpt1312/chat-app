import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Timestamp } from './common';
import { User } from './user.entity';

@Entity({ name: 'friendships', schema: 'public' })
export class Friendship {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id!: string;

  @Column({ type: 'bigint', name: 'user_id', nullable: false })
  userId!: string;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_friendship_user_id',
  })
  user!: User;

  @Column({ type: 'bigint', name: 'friend_id', nullable: false })
  friendId!: string;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'friend_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_friendship_friend_id',
  })
  friend!: User;

  @Column({
    name: 'status',
    type: 'varchar',
    length: '50',
    nullable: false,
  })
  status!: string;

  @Column(() => Timestamp, { prefix: false })
  timestamp!: Timestamp;
}
