import { DeliveryService } from './../../service/delivery.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  Internet: boolean = false;

  //DOM
  nombre: string = 'lukamodric';
  cedula: string = '1234567899';
  telefono: string = '1234567899';
  nickname: string = '';
  password: string = '12212121';
  fechaNacimiento: string = '';
  fechaActual: string = '';

  constructor(
    private router: Router,
    private delivery: DeliveryService,
    private alertController: AlertController
  ) {
    this.obtenerFechaActual();
  }

  verificarConexionInternet(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const image = new Image();
      image.src = 'https://www.google.com/images/phd/px.gif'; // Intentamos cargar una imagen de Google

      image.onload = () => {
        this.Internet = true;
      };

      image.onerror = () => {
        this.Internet = false;
      };
    });
  }

  ngOnInit() {
    setInterval(() => {
      this.generarNick();
      this.verificarConexionInternet();
    }, 1000);
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
    if (
      this.nombre.trim() === '' ||
      this.cedula.trim() === '' ||
      this.telefono.trim() === '' ||
      this.password.trim() === '' ||
      this.fechaNacimiento.trim() === ''
    ) {
      this.presentAlert('Llene los campos', '');
    } else {
      if (/^\d+$/.test(this.cedula) && /^\d+$/.test(this.telefono)) {
        if (this.cedula.length == 10 && this.telefono.length == 10) {
          if (this.password.length > 7) {
            ///REGISTRO
            const objUsuario = {
              nombre: this.nombre,
              cedula: this.cedula,
              telefono: this.telefono,
              nickname: this.nickname,
              password: this.password,
              Nacimiento: this.fechaNacimiento,
              imagen: 'https://i.ibb.co/t2DmbCF/f4de72488ffa.png',
              hoy: this.fechaActual,
            };
            //console.log(objUsuario);
            this.delivery
              .registrarUsuario(objUsuario)
              .pipe(
                catchError((error) => {
                  console.log(error);
                  this.presentAlert('⚠ Error de conexión', '');
                  return [];
                })
              )
              .subscribe((data: any) => {
                console.log(data.Res);
                this.delivery.setUsuario(
                  data.Res.usuario.us_id,
                  data.Res.usuario.us_nombre
                );
                if (data.Res.success === true) {
                  this.presentAlert('Bienvenido', '');
                  this.router.navigate(['tabs/tab1']);
                }
              });
          } else {
            this.presentAlert('Contraseña insegura', '');
          }
        } else {
          this.presentAlert('Cedula o numero invalido', '');
        }
      } else {
        this.presentAlert('Cedula o numero invalido', '');
      }
    }
  }

  generarNick() {
    let nick = this.nombre + this.telefono.slice(-2) + this.cedula.slice(-2);
    this.nickname = nick.toLowerCase();
  }

  async presentAlert(titulo: string, subtitulo: string) {
    const alert = await this.alertController.create({
      header: `${titulo}`,
      subHeader: `${subtitulo}`,
      message: ``,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
