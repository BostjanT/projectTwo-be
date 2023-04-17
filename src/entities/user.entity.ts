import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { GuessLocation } from './guess.entity';
import { Location } from './location.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  locationId: string;

  @OneToMany(() => GuessLocation, (guessLocation) => guessLocation.user, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
  guessLocation: GuessLocation[];

  @OneToMany(() => Location, (location) => location.user, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
  location: Location[];
}
