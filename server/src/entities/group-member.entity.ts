import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Group } from './group.entity';
import { User } from './user.entity';

@Entity({ name: 'group_members', schema: 'public' })
export class GroupMember {
  @PrimaryColumn({ type: 'bigint', name: 'id' })
  id!: string;

  @Column({ type: 'bigint', name: 'group_id' })
  groupId!: string;

  @ManyToOne(() => Group, (group) => group.id)
  @JoinColumn({
    name: 'group_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_users_groups_group_id',
  })
  group!: Group;

  @Column({ type: 'bigint', name: 'user_id' })
  userId!: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_users_groups_user_id',
  })
  user!: User;
}
