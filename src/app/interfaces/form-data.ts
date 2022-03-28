import { Ingriedient } from "./ingriedient";

export interface FormData {
  name: string,
  description: string,
  ingriedients: Ingriedient[]
}
