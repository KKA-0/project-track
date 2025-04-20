import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  playlist_id: string;

  @Column({ nullable: true })
  playlist_name: string | null;

  @Column({ type: 'jsonb', nullable: false, default: () => "'{}'::jsonb" })
  playlist_json: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
