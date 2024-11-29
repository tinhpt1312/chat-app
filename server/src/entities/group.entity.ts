import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Timestamp } from './common';
import { User } from './user.entity';
import { GroupMember } from './group-member.entity';

@Entity({ name: 'groups', schema: 'public' })
export class Group {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id!: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'name',
  })
  name!: string;

  @Column({
    type: 'bigint',
    name: 'admin',
    nullable: false,
  })
  adminId!: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({
    name: 'admin',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_group_admin',
  })
  admin!: User;

  @OneToMany(() => GroupMember, (member) => member.group)
  groupMembers!: GroupMember[];

  @Column(() => Timestamp, { prefix: false })
  timestamp!: Timestamp;
}
