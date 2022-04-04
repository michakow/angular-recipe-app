import { Ingriedient } from './ingriedient';

export interface Recipe {
  id: number;
  name: string;
  description: string[];
  ingriedients: Ingriedient[];
  rating: number;
  author: string;
}
