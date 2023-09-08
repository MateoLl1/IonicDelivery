import { DeliveryService } from './../../service/delivery.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  //DOM
  nombre: string = '';
  cedula: string = '';
  telefono: string = '';
  nickname: string = '';
  password: string = '';
  fechaNacimiento: Date | null = null;
  fechaActual: string = '';

  constructor(private router: Router, private delivery: DeliveryService) {
    this.obtenerFechaActual();
  }

  obtenerFechaActual() {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque enero es 0
    const year = date.getFullYear();

    this.fechaActual = `${day}/${month}/${year}`;
  }
  navegarInicio() {
    this.router.navigate(['']);
  }

  registrar() {
    const objUsuario = {
      nombre: this.nombre,
      cedula: this.cedula,
      telefono: this.telefono,
      nickname: this.nickname,
      password: this.password,
      Nacimiento: this.fechaNacimiento,
      hoy: this.fechaActual,
    };
    console.log(objUsuario);
  }
  ngOnInit() {}
}
