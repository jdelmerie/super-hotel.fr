import { Hotel } from './hotel';
import { User } from './user';

export class Hotelier {
  id: number;
  firstname: string;
  lastname: string;
  hotels: Array<Hotel>;
  user: User;

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    hotels: Array<Hotel>,
    user: User
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.hotels = hotels;
    this.user = user
  }
}
