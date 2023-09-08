import { DeliveryService } from './../../service/delivery.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string = '';
  password: string = '';
  respuesta: boolean = false;

  imagenPath = '../../../assets/img/imagen-login.png';

  constructor(
    private alertController: AlertController,
    private http: HttpClient,
    private router: Router,
    private delivery: DeliveryService
  ) {
    router.navigate(['registro']);
  }

  ngOnInit() {}

  navegarRegistro() {
    this.router.navigate(['registro']);
  }

  iniciarSeccion() {
    if (this.usuario.trim() === '' || this.password.trim() === '') {
      this.presentAlert('Llene los campos', '');
    } else {
      const objUsuario = {
        Usuario: this.usuario,
        Pass: this.password,
      };
      console.log(objUsuario);
      this.delivery.validarCredenciales(objUsuario).subscribe((data: any) => {
        console.log(data.Res);
        if (data.Res === true) {
          this.presentAlert('Bienvenido', '');
          this.router.navigate(['tabs/tab1']);
        } else {
          this.presentAlert('Credenciales incorrectas', '');
          this.usuario = '';
          this.password = '';
        }
      });
    }
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
