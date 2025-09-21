import { Cliente } from './cliente.interface';

export interface ClienteUpdate extends Partial<Cliente> {
  password?: string;
}