import { Component } from '@angular/core';
import { DeliveryService } from './../../service/delivery.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  constructor(private delivery: DeliveryService) {
    console.log(delivery.getUsuario());
  }
}
