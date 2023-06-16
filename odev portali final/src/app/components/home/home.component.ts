import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyAlertService } from './../../services/myAlert.service';
import { Alert } from 'selenium-webdriver';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public alert:MyAlertService,
    public matDialog:MatDialog
  ) { }

  ngOnInit() {
  }

  AlertAc(p:boolean){
    
    var s:Sonuc=new Sonuc();
    s.islem=p;
    s.mesaj="Bu Bir Alert Test Mesajıdır..."

    this.alert.AlertUygula(s)
  }

  ConfirmAc(){
    this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
      width:'400px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj="Kayıt Silinecektir Onaylıyor Musunuz ?"
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      console.log(d);
      if (d){
      }
    });
  }

}
