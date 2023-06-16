import { Odev } from 'src/app/models/Odev';
import { Ogrenci } from 'src/app/models/Ogrenci';
import { Ders } from './Ders';
export class Kayit {
    kayitId:string;
    kayitDersId:string;
    kayitOgrId:string;
    kayitOdevId:string;
    ogrBilgi:Ogrenci;
    dersBilgi: Ders;
    odevBilgi: Odev;
}