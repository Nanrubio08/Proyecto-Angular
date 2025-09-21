export interface Cliente {
  _id: string;
  nombre: string;
  tipoid: string;
  id: number;
  correo: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  activo: boolean;
  fechaRegistro: string;
  __v?: number;
}