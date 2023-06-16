import { ApiService } from 'src/app/services/api.service';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { ogrFoto } from './../../../models/OgrFoto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-fotoyukle-dialog',
  templateUrl: './fotoyukle-dialog.component.html',
  styleUrls: ['./fotoyukle-dialog.component.css']
})
export class FotoyukleDialogComponent implements OnInit {
  secilenFoto: any;
  ogrFoto:ogrFoto=new ogrFoto();
  secOgrenci:Ogrenci;
  constructor(
    public fotoDialogRef:MatDialogRef<FotoyukleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public apiServis:ApiService


  ) {
    this.secOgrenci=this.data;
   }

  ngOnInit() {
  }
  FotoSec(e){
    var fotolar=e.target.files;
    var foto=fotolar[0];

    var fr=new FileReader();
    fr.onloadend=()=>{
      this.secilenFoto=fr.result;
      this.ogrFoto.fotoData=fr.result.toString();
      this.ogrFoto.fotoUzanti=foto.type;
    };
    fr.readAsDataURL(foto);
  }
}
