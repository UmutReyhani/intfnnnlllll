import { ogrFoto } from './../../models/OgrFoto';
import { FotoyukleDialogComponent } from './../dialogs/fotoyukle-dialog/fotoyukle-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';
import { OgrenciDialogComponent } from './../dialogs/ogrenci-dialog/ogrenci-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from './../../services/api.service';
import { Ogrenci } from './../../models/Ogrenci';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-ogrenci',
  templateUrl: './ogrenci.component.html',
  styleUrls: ['./ogrenci.component.scss']
})
export class OgrenciComponent implements OnInit {
  ogrenciler:Ogrenci[];
  displayedColumns=['ogrFoto','ogrNo','ogrAdSoyad','ogrDogTarih','islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<OgrenciDialogComponent>;
  fotoDialogRef:MatDialogRef<FotoyukleDialogComponent>;
  ConfirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService
  ) { }

  ngOnInit() {
    this.OgrenciListele();
  }
 OgrenciListele(){
   this.apiServis.OgrenciListe().subscribe((d:Ogrenci[])=>{
    this.ogrenciler = d;
    this.dataSource=new MatTableDataSource(this.ogrenciler);
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
   var yeniKayit:Ogrenci=new Ogrenci();
   this.dialogRef=this.matDialog.open(OgrenciDialogComponent,{
     width:'400px',
     data:{
       kayit:yeniKayit,
       islem:'ekle'
     }
   });

   this.dialogRef.afterClosed().subscribe(d=>{
     if(d){
      this.apiServis.OgrenciEkle(d).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
        this.OgrenciListele();
      }
    });
    }
   });

  }
  Duzenle(kayit:Ogrenci){
    this.dialogRef=this.matDialog.open(OgrenciDialogComponent,{
      width:'400px',
      data:{
        kayit: kayit,
        islem:'duzenle'
      }
    });

    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
      kayit.ogrNo=d.ogrNo;
      kayit.ogrAdSoyad=d.ogrAdSoyad;
      kayit.ogrDogTarih=d.ogrDogTarih;

      this.apiServis.OgrenciDuzenle(kayit).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
      });
      }

     });
    }
     
    
    Sil(kayit: Ogrenci){
  this.ConfirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
    width:'600px'
  }); 

  this.ConfirmDialogRef.componentInstance.dialogMesaj=kayit.ogrNo + "  " + kayit.ogrAdSoyad + "  --> Bu Öğrenci Silinecektir Onaylıyor Musunuz ?"

  this.ConfirmDialogRef.afterClosed().subscribe(d=>{
    if (d){
      this.apiServis.OgrenciSil(kayit.ogrId).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
        if (s.islem){
          this.OgrenciListele();
        }
      })
    }
  });
  }
  FotoGuncelle(kayit:Ogrenci){
    this.fotoDialogRef=this.matDialog.open(FotoyukleDialogComponent,{
      width:'400px',
      data:kayit
    });
    this.fotoDialogRef.afterClosed().subscribe((d:ogrFoto)=>{
      if (d){
          d.ogrId=kayit.ogrId;
        this.apiServis.OgrFotoGuncelle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.OgrenciListele();
          }
        });
      }
    });
  }

  
  
}
