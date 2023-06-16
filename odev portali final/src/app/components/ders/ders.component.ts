 import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';
import { Kayit } from './../../models/kayit';
import { DersDialogComponent } from './../dialogs/ders-dialog/ders-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ApiService } from 'src/app/services/api.service';
import { Ders } from 'src/app/models/Ders';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Odev } from 'src/app/models/Odev';

@Component({
  selector: 'app-ders',
  templateUrl: './ders.component.html',
  styleUrls: ['./ders.component.css']
})
export class DersComponent implements OnInit {
  dersler:Ders[];
  odevler:Odev[];
  dersId:string;
  dataSource : any;
  displayedColumns=['dersKodu','dersAdi','dersKredi','islemler'];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<DersDialogComponent>;
  ConfirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis:ApiService,
    public alert:MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.DersListele();
  }
  DersListele(){
    this.apiServis.DersListe().subscribe((d:Ders[])=>{
      this.dersler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });
  }
  Filtrele(e){
    var deger=e.target.value;
    this.dataSource.filter=deger.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
   }
   Ekle(){
    var yeniKayit:Ders=new Ders();
    this.dialogRef=this.matDialog.open(DersDialogComponent,{
      width:'400px',
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
        this.apiServis.DersEkle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.DersListele();
          }
        });
      }
    });
}
  Duzenle(kayit: Ders){
    this.dialogRef=this.matDialog.open(DersDialogComponent,{
      width:'400px',
      data:{
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
        d.dersId=kayit.dersId;
        this.apiServis.DersDuzenle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.DersListele();
          }
        });
      }
    });

  }
  Sil(kayit:Ders){
    this.ConfirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
      width:'600px'
    }); 
  
    this.ConfirmDialogRef.componentInstance.dialogMesaj=kayit.dersKodu + "  " + kayit.dersAdi + "  --> Bu Ders Silinecektir Onaylıyor Musunuz ?"
    this.ConfirmDialogRef.afterClosed().subscribe(d=>{
      if (d) {
        this.apiServis.DersSil(kayit.dersId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.DersListele();
          }
        });
      }
    });
  }
}
