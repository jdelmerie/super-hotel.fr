import { Hotel } from './hotel';

export class City {
  id: number;
  name: string;
  zipcode: string;
  hotels: Array<Hotel>;

  constructor(id: number, name: string, zipcode: string, hotels: Array<Hotel>) {
    this.id = id;
    this.name = name;
    this.zipcode = zipcode;
    this.hotels = hotels;
  }
}
