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
  constructor(
    private alertController: AlertController,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {}

  iniciarSeccion() {
    const url = 'https://mateoservice.onrender.com/login';
    const Usuario = {
      Usuario: this.usuario,
      Pass: this.password,
    };
    this.http.post(url, Usuario).subscribe(
      (response: any) => {
        console.log(response);
        if (response.Res === true) {
          const titulo = 'Bienvenido';
          const subtitulo = `${this.usuario}`;
          this.presentAlert(titulo, subtitulo);
          this.router.navigate(['tabs/tab1']);
        } else {
          const titulo = 'Credenciales Incorrectas';
          const mensaje = `Usuario o contraseña incorrectas`;
          this.presentAlert(titulo, mensaje);
        }
      },
      (error) => {
        const titulo = 'Error de Conexion';
        const mensaje = `Verifica que tengas internet`;
        this.presentAlert(titulo, mensaje);
      }
    );
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
