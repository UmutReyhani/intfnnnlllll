import { Ders } from 'src/app/models/Ders';
import { Odev } from 'src/app/models/Odev';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-odev-dialog',
  templateUrl: './odev-dialog.component.html',
  styleUrls: ['./odev-dialog.component.css']
})
export class OdevDialogComponent implements OnInit {
  dersId:string;
  dersler:Ders[];
  dialogBaslik: string;
  islem: string;
  frm:FormGroup;
  yeniKayit:Odev;

  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public frmBuild:FormBuilder,
    public dialogRef:MatDialogRef<OdevDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

    ) { 
    this.islem=data.islem;
    this.yeniKayit=data.kayit;
    if (this.islem=='ekle'){
      this.dialogBaslik="Ödev Ekle";
    }
    if (this.islem=='duzenle'){
      this.dialogBaslik="Ödev Düzenle";
    }
    this.frm=this.FormOlustur();
  }

  ngOnInit() {
    this.DersListele();
  }
  FormOlustur(){
    return this.frmBuild.group({
      odevAdi:[this.yeniKayit.odevAdi],
      odevDersId:[this.yeniKayit.odevDersId]
    });
  }
  DersListele(){
    this.apiServis.DersListe().subscribe((d:Ders[])=>{
      this.dersler = d;
    });
  }
  DersSec(ders:Ders){
    this.dersId = ders.dersId;
  }
}
