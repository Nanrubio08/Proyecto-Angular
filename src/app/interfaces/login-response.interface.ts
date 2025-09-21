import { Cliente } from './cliente.interface';

export interface LoginResponse {
  token: string;
  cliente: Cliente;
}