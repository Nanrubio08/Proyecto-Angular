import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interface';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private baseUrl = `${environment.apiUrl}/cliente`;

  constructor(private http: HttpClient) {}

  actualizarCliente(id: string, payload: Partial<Cliente>): Observable<Cliente> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch<Cliente>(`${this.baseUrl}/actualizar/${id}`, payload, { headers });
  }
}