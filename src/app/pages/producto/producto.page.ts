import { Component, OnInit } from '@angular/core';
import { DeliveryService } from './../../service/delivery.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    private active: ActivatedRoute,
    private alertController: AlertController,
    private router: Router
  ) {
    active.params.subscribe((data: any) => {
      this.idEmpresa = data.id;
      let objetoProducto = {
        id: this.idEmpresa,
      };

      delivery.productoId(objetoProducto).subscribe((data: any) => {
        this.productos = data;
        this.productos.forEach(() => {
          this.cantidades.push(0);
        });
        this.productos.forEach((producto) => {
          producto.seleccionado = false;
        });
        console.log(this.productos);
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
    if (this.cantidades[index] === 0) {
      this.productos[index].seleccionado = false;
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
    this.productos[index].seleccionado = true;
  }

  generarPedido() {
    // Filtrar los productos con "seleccionado" igual a true
    const productosSeleccionados = this.productos.filter(
      (producto) => producto.seleccionado === true
    );

    // Imprimir solo la cantidad y el nombre de los productos seleccionados
    let descriProducto = '';
    let descriPrecios = '';
    productosSeleccionados.forEach((producto) => {
      const cantidad = this.cantidades[this.productos.indexOf(producto)];
      descriProducto += `${cantidad} ${producto.pro_nombre} / `;
      descriPrecios += `${(producto.pro_precio * cantidad).toFixed(2)} / `;
    });

    const usuarioInfo = this.delivery.getUsuario();
    const objFactura = {
      desProd: descriProducto,
      desPrecio: descriPrecios,
      total: this.precioTotal,
      us_id: usuarioInfo[0],
      em_id: this.idEmpresa,
    };

    this.alertaIonic('Confirmar orden', `$ ${this.precioTotal}`, objFactura);
  }

  async alertaIonic(titulo: string, mensaje: string, objFactura: {}) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Botón 1 presionado');
            console.log(objFactura);
            this.delivery.crearFactura(objFactura).subscribe((data: any) => {
              console.log(data.Res);
              if (data.Res === true) {
                this.router.navigate(['tabs/tab2']);
              }
            });
          },
        },
        {
          text: 'Cancelar',
          handler: () => {
            // Lógica a ejecutar cuando se presione el Botón 2
            console.log('Botón 2 presionado');
          },
        },
      ],
    });

    await alert.present();
  }

  ngOnInit() {}
}
