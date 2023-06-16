import { Kayit } from 'src/app/models/kayit';
import { Odev } from 'src/app/models/Odev';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DersDialogComponent } from '../dialogs/ders-dialog/ders-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';
import { Ders } from 'src/app/models/Ders';
import { OdevDialogComponent } from '../dialogs/odev-dialog/odev-dialog.component';

@Component({
  selector: 'app-odev',
  templateUrl: './odev.component.html',
  styleUrls: ['./odev.component.css']
})
export class OdevComponent implements OnInit {
  dersler:Ders[];
  odevler:Odev[];
  kayitlar:Kayit[];
  dersId:string;
  dataSource : any;
  displayedColumns=['odevAdi','islemler'];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<OdevDialogComponent>;
  ConfirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis:ApiService,
    public alert:MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.DersListele();

  }
  OdevListele(){
    this.apiServis.OdevListeByDersId(this.dersId).subscribe((d:Odev[])=>{
      this.odevler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });
  }
  DersListele(){
    this.apiServis.DersListe().subscribe((d:Ders[])=>{
      this.dersler=d;
    });
  }
  DersSec(ders:Ders){
    this.dersId=ders.dersId;
    this.OdevListele();
  }
  Filtrele(e){
    var deger=e.target.value;
    this.dataSource.filter=deger.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
   }
   Ekle(){
    var yeniKayit:Odev = new Odev();
    this.dialogRef=this.matDialog.open(OdevDialogComponent,{
      width:'400px',
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
        console.log(d);

        this.apiServis.OdevEkle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.OdevListele();
          }
        });
      }
    });
}
  Duzenle(kayit: Ders){
    this.dialogRef=this.matDialog.open(OdevDialogComponent,{
      width:'400px',
      data:{
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
        d.dersId=kayit.dersId;
        this.apiServis.OdevDuzenle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.OdevListele();
          }
        });
      }
    });

  }
  Sil(kayit:Odev){
    this.ConfirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
      width:'600px'
    }); 
  
    this.ConfirmDialogRef.componentInstance.dialogMesaj=kayit.odevDersAdi + " Adlı Dersin " + kayit.odevAdi + "  --> Adlı Ödevi Silinecektir Onaylıyor Musunuz ?"
    this.ConfirmDialogRef.afterClosed().subscribe(d=>{
      if (d) {
        this.apiServis.OdevSil(kayit.dersId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.OdevListele();
          }
        });
      }
    });
  }
}