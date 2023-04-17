import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Location } from './location.entity';

@Entity()
export class GuessLocation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  distance: string;

  @Column()
  timeCreated: Date;

  @Column()
  userId: string;

  @Column()
  locationId: string;

  @Column()
  locationImage: string;

  @ManyToOne(() => User, (user) => user.locationId, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
  user: User;

  @ManyToOne(() => Location, (location) => location.userId, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
  location: Location;
}
