import { Hotel } from './hotel';

export class Hotelier {
  id: number;
  firstname: string;
  lastname: string;
  hotels: Array<Hotel>;

  constructor(
    id: number,
    firstname: string,
    lastname: string,
    hotels: Array<Hotel>
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.hotels = hotels;
  }
}
