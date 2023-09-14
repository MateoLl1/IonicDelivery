import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeliveryService {
  local: string = 'http://localhost:4040';
  online: string = 'https://mateoservice.onrender.com';
  servidorLocal = `${this.online}`;

  //Variables megaGlobales
  idUsuario: number = 0;
  nombreUsuario: string | null = null;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) {}

  /// Usuario
  getUsuario() {
    console.log(`ID: ${this.idUsuario}`);
    console.log(`Nombre: ${this.nombreUsuario}`);
    return [this.idUsuario, this.nombreUsuario];
  }

  setUsuario(id: number, nombre: string) {
    this.idUsuario = id;
    this.nombreUsuario = nombre;
  }

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

  obtenerUsuarioId(data: any) {
    return this.http.post(`${this.servidorLocal}/idUsuario`, data, {
      headers: this.headers,
    });
  }

  actualizarUsuario(data: any) {
    return this.http.post(`${this.servidorLocal}/actualizarUsuario`, data, {
      headers: this.headers,
    });
  }

  //EMPRESA
  cargarEmpresas() {
    return this.http.post(`${this.servidorLocal}/cargarEmpresa`, null);
  }

  empresaId(data: any) {
    return this.http.post(`${this.servidorLocal}/idEmpresa`, data, {
      headers: this.headers,
    });
  }

  productoId(data: any) {
    return this.http.post(`${this.servidorLocal}/idProductos`, data, {
      headers: this.headers,
    });
  }

  //FACTURA
  crearFactura(data: any) {
    return this.http.post(`${this.servidorLocal}/generarFactura`, data, {
      headers: this.headers,
    });
  }

  traerFacturasId(data: any) {
    return this.http.post(`${this.servidorLocal}/facturaId`, data, {
      headers: this.headers,
    });
  }
}
