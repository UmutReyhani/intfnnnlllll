import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { OdevDialogComponent } from './../dialogs/odev-dialog/odev-dialog.component';
import { OdevlendirComponent } from './../dialogs/odevlendir/odevlendir.component';

import { MatTableDataSource } from '@angular/material/table';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { Kayit } from './../../models/kayit';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ders } from 'src/app/models/Ders';
import { Sonuc } from 'src/app/models/Sonuc';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Odev } from 'src/app/models/Odev';

@Component({
  selector: 'app-derslistele',
  templateUrl: './derslistele.component.html',
  styleUrls: ['./derslistele.component.scss']
})
export class DerslisteleComponent implements OnInit {
dersler:Ders[];
secOgrenci:Ogrenci;
ogrId:string;
displayedColumns=['odevAdi','dersAdi','islemler'];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator; 
  dataSource:any;
  kayitlar:Kayit[];
  dialogRef:MatDialogRef<OdevlendirComponent>;
  ConfirmDialogRef:MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis:ApiService,
    public alert:MyAlertService,
    public route:ActivatedRoute,
    public matDialog: MatDialog
    
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if (p){
        this.ogrId=p.ogrId;
        this.OgrenciGetir();
        this.DersListele();
        this.OdevListele();
      }
    });
  }
  
  OgrenciGetir(){
    this.apiServis.OgrenciById(this.ogrId).subscribe((d:Ogrenci)=>{
      this.secOgrenci=d;
    });
  }

  DersListele(){
    this.apiServis.DersListe().subscribe((d:Ders[])=>{
     this.dersler = d;
     this.dataSource=new MatTableDataSource(this.dersler);
    });
  }

  OdevListele(){
    this.apiServis.OgrenciOdevListe(this.ogrId).subscribe((d: Kayit[]) => {
      this.kayitlar= d;
      console.log(d);
      this.dataSource=new MatTableDataSource(d);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });
  }
  Ekle(){
    var yeniKayit:Kayit = new Kayit();
    this.dialogRef=this.matDialog.open(OdevlendirComponent,{
      width:'400px',
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
  var odev:Odev=d;
var kayit=new Kayit();
kayit.kayitOgrId=this.ogrId;
kayit.kayitDersId=odev.odevDersId;
kayit.kayitOdevId=odev.odevId;
        this.apiServis.KayitEkle(kayit).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          this.OdevListele();
        });
      }
    });
}

}