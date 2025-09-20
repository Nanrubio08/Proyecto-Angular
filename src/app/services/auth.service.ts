// src/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: { correo: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${environment.apiUrl}/cliente/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
        })
      );
  }
  register(data: {
  nombre: string;
  tipoid: string;
  id: number;
  correo: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  password: string;
}): Observable<{ token: string }> {
  return this.http.post<{ token: string }>(`${environment.apiUrl}/cliente/registrar`, data)
    .pipe(tap(response => localStorage.setItem('token', response.token)));
}

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}