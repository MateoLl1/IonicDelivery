import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  ruta: string =
    'BQD_EECryAasQJTOgjovsTF1XMG7remBOJbkJTbU3d2pMRjMfPGhhYwF5ftIeK_ZJum9G9ZvnPfLi9MFzV6jUFGNF2P22hS9o-wKMeJx5HSjzxuqDSg';
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
}
