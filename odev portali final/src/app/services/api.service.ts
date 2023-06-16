import { ogrFoto } from './../models/OgrFoto';
import { Kayit } from './../models/kayit';
import { Odev } from './../models/Odev';
import { Ders } from './../models/Ders';
import { Ogrenci } from './../models/Ogrenci';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl="http://localhost:11183/api/";
  siteUrl="http://localhost:11183/";
constructor(
  public http: HttpClient
) { }

  OgrenciListe(){
    return this.http.get(this.apiUrl+ "ogrenciliste");
  }

  OgrenciById(ogrId:string){
    return this.http.get(this.apiUrl+"ogrencibyid/"+ogrId);
  }

  OgrenciEkle(ogr:Ogrenci){
    return this.http.post(this.apiUrl+"ogrenciekle",ogr);
  }
  
  OgrenciDuzenle(ogr:Ogrenci){
    return this.http.put(this.apiUrl+"ogrenciduzenle",ogr);
  }

  OgrenciSil(ogrId: string){
    return this.http.delete(this.apiUrl+"ogrencisil/" + ogrId);
  }

  DersListe(){
    return this.http.get(this.apiUrl+"dersliste");
  }

  DersById(dersId: string){
    return this.http.get(this.apiUrl+"dersbyid/"+ dersId);
  }

  DersEkle(ders: Ders){
    return this.http.post(this.apiUrl+"dersekle", ders);
  }
  
  DersDuzenle(ders: Ders){
    return this.http.put(this.apiUrl+"dersduzenle", ders);
  }

  DersSil(dersId: string){
    return this.http.delete(this.apiUrl+"derssil/" + dersId);
  }


  OdevListe(){
    return this.http.get(this.apiUrl+"odevliste");
  }

  OdevById(odevId: string){
    return this.http.get(this.apiUrl+"odevbyid/"+ odevId);
  }

  OdevEkle(ders: Ders){
    return this.http.post(this.apiUrl+"odevekle/", ders);
  }
  
  OdevDuzenle(odev: Odev){
    return this.http.put(this.apiUrl+"odevduzenle", odev);
  }

  OdevSil(dersId: string){
    return this.http.delete(this.apiUrl+"odevsil/" + dersId);
  }




  OgrenciOdevListe(ogrId:string){
    return this.http.get(this.apiUrl+"ogrenciodevliste/"+ ogrId);
  }
  OdevOgrenciListe(odevId:string){
    return this.http.get(this.apiUrl+"odevogrenciliste/"+ odevId);
  }
  KayitEkle(kayit: Kayit){
    return this.http.post(this.apiUrl+"kayitekle", kayit);
  }
  KayitSil(kayitId: string){
    return this.http.delete(this.apiUrl+"kayitsil/" + kayitId);
  }


  OgrFotoGuncelle(ogrFoto: ogrFoto){
    return this.http.post(this.apiUrl+"ogrfotoguncelle", ogrFoto);
  }
  OdevListeByDersId(dersId:string){
    return this.http.get(this.apiUrl+"odevlistebydersid/"+ dersId);
  }
}
