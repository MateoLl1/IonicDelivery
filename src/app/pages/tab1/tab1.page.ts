import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  selectedFile: File | null = null;
  imageBase64: string | null = null;
  imagen: string | null = null;

  //Data del hosting de imagenes
  hostImages: string = '';
  llego: boolean = false;

  constructor(private servidor: BackendService) {}
  ngOnInit() {}

  async subirImagen() {
    if (this.imagen) {
      this.servidor.subirImagenes(this.imagen).subscribe((data: any) => {
        this.hostImages = data.data.url;
        console.log(this.hostImages);
        this.llego = true;
      });
    } else {
      console.log('No hay imagen');
    }
  }

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
      };

      reader.readAsDataURL(this.selectedFile!);
    }
  }
}
