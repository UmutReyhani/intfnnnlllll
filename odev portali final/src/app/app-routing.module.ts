import { OdevlendirComponent } from './components/dialogs/odevlendir/odevlendir.component';
import { OdevComponent } from './components/odev/odev.component';
import { DerslisteleComponent } from './components/derslistele/derslistele.component';
import { OgrenciComponent } from './components/ogrenci/ogrenci.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DersComponent } from './components/ders/ders.component';
import { OdevListeleComponent } from './components/odev-listele/odev-listele.component';


const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'ogrenci',
    component: OgrenciComponent
  },
  {
    path:'ders',
    component: DersComponent
  },
  {
    path:'odev',
    component: OdevComponent
  },
  {
    path:'derslistele/:ogrId',
    component: DerslisteleComponent
  },
  {
    path:'odevlistele/:dersId',
    component: OdevListeleComponent
  },
  {
    path:'odevlendir',
    component: OdevlendirComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
