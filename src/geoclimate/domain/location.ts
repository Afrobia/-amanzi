import { randomUUID } from 'crypto';
import { User } from '../../users/domain/model/user';

export class Location {
  id: string;
  city: string;
  state: string;
  averageTemperature: number;
  relativeHumidity: number;
  user: User;

  constructor() {
    this.id = randomUUID();
  }
}
