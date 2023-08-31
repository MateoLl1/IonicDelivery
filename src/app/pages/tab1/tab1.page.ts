import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/service/backend.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  selectedFile: File | null = null;
  imageBase64: string | null = null;

  constructor(
    private servidor: BackendService,
    private httpClient: HttpClient
  ) {}
  ngOnInit() {}

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageBase64 = e.target.result;
        console.log(this.imageBase64);
      };

      reader.readAsDataURL(this.selectedFile!);
    }
  }

  //////
}
