import { User } from 'src/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GuessLocation } from './guess.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  image: string;

  @Column()
  timeCreated: Date;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.location, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
  user: User;

  @OneToMany(() => GuessLocation, (guessLocation) => guessLocation.location, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
  guessLocation: GuessLocation[];
}
