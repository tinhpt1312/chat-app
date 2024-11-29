import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Timestamp } from './common';
import { User } from './user.entity';
import dayjs from 'dayjs';
import { UserCodeExpiration } from 'src/types/auth.type';

@Entity({ name: 'user_codes', schema: 'public' })
export class UserCode {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id!: string;

  @Column({ type: 'bigint', name: 'user_id', nullable: false })
  userId!: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_user_codes_users_user_id',
  })
  user!: User;

  @Column({ type: 'varchar', length: 50, name: 'code', nullable: false })
  code!: string;

  @Column({
    name: 'type',
    type: 'varchar',
    length: '50',
    nullable: false,
  })
  type!: string;

  @Column({
    type: 'timestamp without time zone',
    name: 'expired_at',
    nullable: false,
  })
  expiredAt!: Date;

  @Column({
    type: 'timestamp without time zone',
    name: 'used_at',
    nullable: true,
  })
  usedAt!: Date | null;

  @Column(() => Timestamp, { prefix: false })
  timestamp!: Timestamp;

  @BeforeInsert()
  beforeInsert() {
    const expirationTime =
      UserCodeExpiration[this.type as keyof typeof UserCodeExpiration] ||
      UserCodeExpiration.REGISTER;

    this.expiredAt = new Date(Date.now() + expirationTime);
  }

  isExpired(): boolean {
    return dayjs().isAfter(this.expiredAt);
  }
}
