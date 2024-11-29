import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';
import { User } from './user.entity';

@Entity({ name: 'attachments', schema: 'public' })
export class Attachment {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id!: string;

  @Column({ type: 'bigint', name: 'message_id', nullable: false })
  messageId!: string;

  @ManyToOne(() => Message, (message) => message.id)
  @JoinColumn({
    name: 'message_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_attachments_messages_message_id',
  })
  message!: Message;

  @Column({ type: 'varchar', length: 255, name: 'file_url', nullable: false })
  fileUrl!: string;

  @Column({ type: 'varchar', length: 50, name: 'file_type', nullable: false })
  fileType!: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'uploaded_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  uploadedAt!: Date | null;

  @Column('bigint', {
    name: 'uploaded_by',
    nullable: true,
    unique: false,
  })
  uploadedById!: string | null;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({
    name: 'uploaded_by',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_attachments_users_uploaded_by',
  })
  uploadedBy!: User | null;
}
