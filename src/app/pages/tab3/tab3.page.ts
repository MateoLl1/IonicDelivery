import { Component } from '@angular/core';
import { DeliveryService } from './../../service/delivery.service';
import { BackendService } from './../../service/backend.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  //DOM
  nombre: string = 'dawd';
  nickname: string = '';
  password: string = '';
  cedula: string = '';
  telefono: string = '';
  fechaN: string = '';
  fechaFormateada: string = '';

  //Data del hosting de imagenes
  selectedFile: File | null = null;
  imageBase64: string | null = null;
  imagen: string | null = null;
  hostImages: string = '';
  llego: boolean = false;
  sinImagen = '../../../assets/img/noimage.png';

  constructor(
    private delivery: DeliveryService,
    private servidor: BackendService,
    private alertController: AlertController
  ) {
    console.log(delivery.getUsuario());
    const usuarioInfo = delivery.getUsuario();
    const objUsuario = {
      us_id: usuarioInfo[0],
    };
    delivery.obtenerUsuarioId(objUsuario).subscribe((data: any) => {
      console.log(data.Res);
      this.nombre = data.Res[0].us_nombre;
      this.nickname = data.Res[0].us_nick;
      this.cedula = data.Res[0].us_cedula;
      this.telefono = data.Res[0].us_telefono;
      this.fechaN = data.Res[0].us_nacimiento;
      this.hostImages = data.Res[0].us_imagen;
      this.llego = true;
      if (this.fechaN) {
        const fecha = new Date(this.fechaN);
        this.fechaFormateada = fecha.toISOString().split('T')[0];
      } else {
        console.error('Fecha no válida: ', this.fechaN);
      }
    });
  }

  actualizar() {
    if (
      this.nombre.trim() === '' ||
      this.cedula.trim() === '' ||
      this.telefono.trim() === '' ||
      this.fechaFormateada.trim() === ''
    ) {
      this.presentAlert('Llene los campos', '');
    } else {
      if (/^\d+$/.test(this.cedula) && /^\d+$/.test(this.telefono)) {
        if (this.cedula.length == 10 && this.telefono.length == 10) {
          ///ACTUALIZAR

          const usuarioInfo = this.delivery.getUsuario();
          const objUsuario = {
            id: usuarioInfo[0],
            nombre: this.nombre,
            nick: this.nickname,
            imagen: this.hostImages,
            cedula: this.cedula,
            fechaN: this.fechaFormateada,
          };
          console.log(objUsuario);
          this.delivery.actualizarUsuario(objUsuario).subscribe((data: any) => {
            console.log(data);
            if (data.Res === true) {
              this.presentAlert('Informacion Actualizada', '');
            }
          });
        } else {
          this.presentAlert('Cedula o numero invalido', '');
        }
      } else {
        this.presentAlert('Cedula o numero invalido', '');
      }
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

  ngOnInit() {
    setInterval(() => {
      this.generarNick();
    }, 1000);
  }

  generarNick() {
    let nick = this.nombre + this.telefono.slice(-2) + this.cedula.slice(-2);
    this.nickname = nick.toLowerCase();
  }

  formatearFecha() {
    const fecha = new Date(this.fechaN);
    this.fechaFormateada = fecha.toISOString().split('T')[0];
  }

  //Servidor de imagenes
  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageBase64 = e.target.result as string;
        this.imagen = this.imageBase64.replace(
          /^data:image\/(png|jpg|jpeg);base64,/,
          ''
        );
        this.subirImagen();
      };
      reader.readAsDataURL(this.selectedFile!);
    }
  }

  async subirImagen() {
    if (this.imagen) {
      this.servidor.subirImagenes(this.imagen).subscribe((data: any) => {
        this.hostImages = data.data.url;
        console.log(data.data.url);
        this.llego = true;
      });
    } else {
      console.log('No hay imagen');
    }
  }

  /////////////////
}
