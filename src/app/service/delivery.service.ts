import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  servidorLocal = 'http://localhost:4040';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) {}

  validarCredenciales(data: any) {
    return this.http.post(`${this.servidorLocal}/login`, data, {
      headers: this.headers,
    });
  }

  registrarUsuario(data: any) {
    return this.http.post(`${this.servidorLocal}/registrarUsuario`, data, {
      headers: this.headers,
    });
  }
}
