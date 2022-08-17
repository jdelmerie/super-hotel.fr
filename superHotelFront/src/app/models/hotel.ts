import { City } from './city';
import { Hotelier } from './hotelier';

export class Hotel {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  image: string;
  numberOfRooms: number;
  numberOfStars: number;
  city: City;
  hotelier: Array<Hotelier>;

  constructor(
    id: number,
    name: string,
    address: string,
    email: string,
    phone: string,
    image: string,
    numberOfRooms: number,
    numberOfStars: number,
    city: City,
    hotelier: Array<Hotelier>
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.email = email;
    this.phone = phone;
    this.image = image;
    this.numberOfRooms = numberOfRooms;
    this.numberOfStars = numberOfStars;
    this.city = city;
    this.hotelier = hotelier;
  }
}
