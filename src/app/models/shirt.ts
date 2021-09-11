export interface Shirt {
  name: string;
  price: number;
}
export interface ShirtId extends Shirt{
  id: string;
}