import { Component } from '@angular/core';
import { BackendService } from 'src/app/service/backend.service';
import { HttpClient } from '@angular/common/http';
import { DeliveryService } from './../../service/delivery.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  facturas: any[] = [];

  constructor(private delivery: DeliveryService) {
    console.log(delivery.getUsuario());
    const usuarioInfo = delivery.getUsuario();
    const objFactura = {
      us_id: usuarioInfo[0],
    };
    delivery.traerFacturasId(objFactura).subscribe((data: any) => {
      console.log(data.Res);
      this.facturas = data.Res;
    });
  }

  recargar() {
    location.reload();
  }
}
