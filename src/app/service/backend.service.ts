import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  ruta: string =
    'BQDRHEXNysxyZWLNy6z4AmsbPnAEMuZKtfi_Al4l1WRZqsH5flwnXko-LvmKPC2aYC4NfoMQ8nB8qaa4yy3rrmOzMdYtuBIOUhQfjS8tLNVVLEnX4_U';

  api: string = 'http://192.168.1.43:4040/Cargar';
  constructor(private http: HttpClient) {}

  getQuery(query: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.ruta}`,
    });
    return this.http.get(`https://api.spotify.com/v1/${query}`, {
      headers,
    });
  }

  conectarSpotify() {
    console.log('Conectado a Spotify');
    return this.getQuery('browse/new-releases');
  }

  conectarApi() {
    return this.http.post(this.api, null);
  }
}
