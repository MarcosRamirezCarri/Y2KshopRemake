interface Location {
  city: string;
  province: string;
  country: string;
}
export interface AccountType {
  id: number;
  password: string;
  name: string;
  history: History[];
  location: Location;
  email: string;
  phone: string;
  admin: boolean;
}
export interface History {
  name: string;
  color: string;
  size: string;
  images: string[];
  productId: number;
  quantity: number;
  state: string;
  itemId: number;
  lastUpdate: string;
}
