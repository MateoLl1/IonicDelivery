import { Component, OnInit } from '@angular/core';
import { DeliveryService } from './../../service/delivery.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  idEmpresa: number | null = null;
  empresa: any[] = [];
  productos: any[] = [];

  //Logica del Usuario
  cantidades: number[] = [];

  //Logica del negocio
  compra: boolean = false;
  cantidadTotal: number = 0;
  precioTotal: number = 0;

  constructor(
    private delivery: DeliveryService,
    private active: ActivatedRoute
  ) {
    active.params.subscribe((data: any) => {
      this.idEmpresa = data.id;
      let objetoProducto = {
        id: this.idEmpresa,
      };

      delivery.productoId(objetoProducto).subscribe((data: any) => {
        this.productos = data;
        console.log(data);
        this.productos.forEach(() => {
          this.cantidades.push(0);
        });
      });

      delivery.empresaId(objetoProducto).subscribe((data: any) => {
        this.empresa = data.Res;
        console.log(this.empresa);
      });
    });
  }

  restar(index: number, precio: number) {
    if (this.cantidades[index] > 0) {
      this.compra = true;
      this.cantidades[index]--;
      this.cantidadTotal--;
      this.precioTotal -= precio;
      this.precioTotal = +this.precioTotal.toFixed(3);
    }
    if (this.cantidadTotal === 0) {
      this.compra = false;
    }
  }

  sumar(index: number, precio: number) {
    this.cantidades[index]++;
    this.cantidadTotal++;
    this.compra = true;
    this.precioTotal += precio;
    this.precioTotal = +this.precioTotal.toFixed(3);
  }

  ngOnInit() {}
}
