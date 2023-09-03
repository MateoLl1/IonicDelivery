import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  //Servidor de NodeJs
  servidorNodeJs = 'https://mateoservice.onrender.com';
  //Cargar de Imagenes
  servidorImagenesLink = 'https://api.pexels.com/v1/search?query=people';
  keySerImages = 'ETtoN9X0r4UFpHgRFVVGKWqYZl22ggHwLlH2RSvv2SPItaUjgLBpVFYR';

  //Guardar Imagenes
  rutaImagenesLink = 'https://api.imgbb.com/1/upload';
  keyHostImages = '962e35674435a6e12712a11d03f4d97c';

  constructor(private http: HttpClient) {}

  subirImagenes(imagen: string) {
    const formData = new FormData();
    formData.append('key', `${this.keyHostImages}`);
    formData.append('image', imagen);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(`${this.rutaImagenesLink}`, formData, {
      headers,
    });
  }
}
