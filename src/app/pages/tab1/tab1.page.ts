import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/service/backend.service';
import { DeliveryService } from './../../service/delivery.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  empresas: any[] = [];
  usuario: any[] = [];
  constructor(private delivery: DeliveryService, private router: Router) {
    this.usuario = delivery.getUsuario();
    console.log(this.usuario);
    delivery.cargarEmpresas().subscribe((data: any) => {
      console.log(data);
      this.empresas = data;
    });
  }
  ngOnInit() {}

  navegarProductoEmpresa(id: number) {
    this.router.navigate(['tabs/producto', id]);
  }

  recargar() {
    location.reload();
  }
}
