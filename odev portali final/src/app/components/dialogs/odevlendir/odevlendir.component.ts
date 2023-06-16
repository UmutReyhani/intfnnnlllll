import { Kayit } from './../../../models/kayit';
import { Ders } from './../../../models/Ders';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Odev } from 'src/app/models/Odev';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-odevlendir',
  templateUrl: './odevlendir.component.html',
  styleUrls: ['./odevlendir.component.css']
})
export class OdevlendirComponent implements OnInit {
  dersId:string;
  odev:Odev;
  odevId:string;
  dersler:Ders[];
  kayitlar:Kayit[];
  dialogBaslik: string;
  islem: string;
  frm:FormGroup;
  yeniKayit:Kayit;
  odevler:Odev[];

  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public frmBuild:FormBuilder,
    public dialogRef:MatDialogRef<OdevlendirComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

    ) { 
    this.islem=data.islem;
    this.yeniKayit=data.kayit;
    if (this.islem=='ekle'){
      this.dialogBaslik="Ödevlendir";
    }
    if (this.islem=='duzenle'){
      this.dialogBaslik="Ödev Düzenle";
    }
    this.frm=this.FormOlustur();
  }

  ngOnInit() {
    this.DersListele();
    this.OdevListele();
  }
  FormOlustur(){
    return this.frmBuild.group({
      kayitId:[this.yeniKayit.kayitId],
      kayitDersId:[this.yeniKayit.kayitDersId],
      kayitOgrId:[this.yeniKayit.kayitOgrId]
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
  OdevListele(){
    this.apiServis.OdevListe().subscribe((d:Odev[])=>{
      this.odevler=d;
    });
  }
  OdevSec(odev:Odev){
    this.odev = odev;
  }
}
