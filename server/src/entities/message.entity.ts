import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from './group.entity';
import { User } from './user.entity';
import { MessageContent } from './message-content.entity';
import { Attachment } from './attachment.entity';
import { MessageReaction } from './message-reaction.entity';
import { MessagePinned } from './message-pinned.entity';
import { Report } from './report.entity';

@Entity({ name: 'messages', schema: 'public' })
export class Message {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id!: string;

  @Column({ type: 'varchar', length: 50, name: 'type', nullable: false })
  type!: string;

  @Column({ type: 'bigint', name: 'sender_id', nullable: false })
  senderId!: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({
    name: 'sender_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_messages_users_sender_id',
  })
  sender!: User;

  @Column({ type: 'bigint', name: 'group_id', nullable: true })
  groupId!: string;

  @ManyToOne(() => Group, (group) => group.id)
  @JoinColumn({
    name: 'group_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_messages_groups_group_id',
  })
  group!: Group;

  @Column({
    type: 'bigint',
    name: 'receiver_id',
    nullable: true,
  })
  receiverId!: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({
    name: 'receiver_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_messages_users_receiver_id',
  })
  receiver!: User;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date | null;

  @Column('bigint', {
    name: 'created_by',
    nullable: true,
    unique: false,
  })
  createdById!: string | null;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'created_by',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_timestamp_created_by',
  })
  createdBy!: User | null;

  @OneToMany(() => MessageContent, (messageContent) => messageContent.message)
  messageContents!: MessageContent[];

  @OneToMany(() => Attachment, (attachment) => attachment.message)
  attachments!: Attachment[];

  @OneToMany(
    () => MessageReaction,
    (messageReaction) => messageReaction.message,
  )
  reactions!: MessageReaction[];

  @OneToMany(() => MessagePinned, (messagePinned) => messagePinned.message)
  pinned!: MessagePinned[];

  @OneToMany(() => Report, (report) => report.reportedMessage)
  reports!: Report[];
}
