import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  //Servidor de NodeJs
  servidorNodeJs = 'https://mateoservice.onrender.com';
  //Cargar de Imagenes
  servidorImagenes = 'https://api.pexels.com/v1/search?query=people';
  keySerImages = 'ETtoN9X0r4UFpHgRFVVGKWqYZl22ggHwLlH2RSvv2SPItaUjgLBpVFYR';
  //Guardar Imagenes
  guardarImagenes = 'https://api.imgbb.com/1/upload?';
  keyHostImages = '962e35674435a6e12712a11d03f4d97c';
  constructor(private http: HttpClient) {}

  cargarUsuarios() {
    return this.http.post(`${this.servidorNodeJs}/Cargar`, null);
  }
}
