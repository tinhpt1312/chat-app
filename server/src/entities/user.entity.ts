import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from './common';
import { GroupMember } from './group-member.entity';
import { Group } from './group.entity';
import { Message } from './message.entity';
import { Attachment } from './attachment.entity';
import { MessageReaction } from './message-reaction.entity';
import { UserBlock } from './user-blocked.entity';
import { Report } from './report.entity';
import { Notification } from './notification.entity';

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
    nullable: true,
  })
  password!: string;

  @Column({
    type: 'varchar',
    length: 255,
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

  @Column({
    type: 'varchar',
    length: 50,
    name: 'provider',
    nullable: true,
  })
  provider?: string;

  @Column(() => Timestamp, { prefix: false })
  timestamp!: Timestamp;

  @OneToMany(() => GroupMember, (member) => member.user)
  groupMembers!: GroupMember[];

  @OneToMany(() => Group, (group) => group.admin)
  groups!: Group[];

  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages!: Message[];

  @OneToMany(() => Message, (message) => message.sender)
  sentMessages!: Message[];

  @OneToMany(() => Attachment, (attachment) => attachment.uploadedBy)
  uploadedAttachments!: Attachment[];

  @OneToMany(() => MessageReaction, (messageReaction) => messageReaction.user)
  reactions!: MessageReaction[];

  @OneToMany(() => UserBlock, (userBlock) => userBlock.blocker)
  blockedUsers!: UserBlock[];

  @OneToMany(() => Report, (report) => report.reporter)
  reports!: Report[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications!: Notification[];
}
