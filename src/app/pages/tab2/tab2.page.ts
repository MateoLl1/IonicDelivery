import { Component } from '@angular/core';
import { BackendService } from 'src/app/service/backend.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  usuario: any[] = [];
  error: any;
  constructor(private apiMateo: BackendService, private http: HttpClient) {
    // apiMateo.conectarApi().subscribe((data: any) => {
    //   console.log(data);
    //   this.usuario = data;
    // });
  }
  ngOnInit(): void {
    this.apiMateo.conectarApi().subscribe(
      (data: any) => {
        console.log(data);
        this.usuario = data;
      },
      (error: any) => {
        console.error('Error en la solicitud:', error);
        this.error = error; // Captura el error en la variable 'error'
      }
    );
  }
}
