import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from './common';

@Entity({ name: 'users', schema: 'public' })
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id!: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'username',
    unique: true,
  })
  username!: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'email',
    unique: true,
  })
  email!: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'password',
  })
  password!: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'avatar',
    nullable: true,
  })
  avatar?: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'status',
    nullable: true,
  })
  status?: string;

  @Column({
    type: 'boolean',
    name: 'email_verify',
    default: false,
  })
  emailVerified!: boolean;

  @Column(() => Timestamp, { prefix: false })
  timestamp!: Timestamp;
}
