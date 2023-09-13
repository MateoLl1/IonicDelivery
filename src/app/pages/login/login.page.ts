import { DeliveryService } from './../../service/delivery.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  Internet: boolean = false;
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
    this.verificarConexionInternet();
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
    setTimeout(() => {
      this.verificarConexionInternet();
    }, 1000);
  }

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

      this.delivery
        .validarCredenciales(objUsuario)
        .pipe(
          catchError((error) => {
            console.error('Error en la solicitud:', error);
            this.presentAlert('⚠ Error de conexión', '');
            return [];
          })
        )
        .subscribe((data: any) => {
          console.log(data);
          if (data.Res.success === true) {
            this.presentAlert('Bienvenido', '');
            this.delivery.setUsuario(
              data.Res.usuario.us_id,
              data.Res.usuario.us_nombre
            );
            this.router.navigate(['tabs/tab1']);
          } else if (data.Res == false) {
            this.presentAlert('Credenciales Incorrectas', '');
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
