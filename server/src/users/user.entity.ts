import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Subscriptions } from './../subscriptions/subscriptions.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @Column()
  email: string;

  @Column({ default: 'basic' })
  plan: string;

  @Column()
  source: string;

  @OneToMany(() => Subscriptions, subscription => subscription.user_id)
  subscriptions: Subscriptions[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
