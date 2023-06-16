import { Odev } from 'src/app/models/Odev';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Ders } from 'src/app/models/Ders';
import { Kayit } from 'src/app/models/kayit';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-odev-listele',
  templateUrl: './odev-listele.component.html',
  styleUrls: ['./odev-listele.component.css']
})
export class OdevListeleComponent implements OnInit {
  dersler:Ders[];
  kayitlar:Kayit[];
  secDers:Ders;
  dersId:string;
  displayedColumns=['odevBilgi','islemler'];
    @ViewChild(MatSort) sort:MatSort;
    @ViewChild(MatPaginator) paginator:MatPaginator; 
    dataSource:any;

  
  
    constructor(
      public apiServis:ApiService,
      public alert:MyAlertService,
      public route:ActivatedRoute
    ) { }
  
    ngOnInit() {
      this.route.params.subscribe(p=>{
        if (p){
          this.dersId=p.dersId;
          this.DersGetir();
        }
      });
    }
    
    DersGetir(){
      this.apiServis.OdevListeByDersId(this.dersId).subscribe((d:Ders)=>{
        this.secDers=d;
      });
    }
    

}
