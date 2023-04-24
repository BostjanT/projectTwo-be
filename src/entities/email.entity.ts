import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reset-password')
export class Email {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ unique: true })
  token: string;
}
