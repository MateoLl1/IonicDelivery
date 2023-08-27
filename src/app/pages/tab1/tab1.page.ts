import { Component } from '@angular/core';
import { BackendService } from 'src/app/service/backend.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  nuevasCanciones: any[] = [];
  constructor(private servicio: BackendService, private http: HttpClient) {
    servicio.conectarSpotify().subscribe((data: any) => {
      console.log(data.albums.items);
      this.nuevasCanciones = data.albums.items;
    });
  }
}
