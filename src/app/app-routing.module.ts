import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NihiiComponent} from './pages/nihii/nihii.component';
import {SsinComponent} from './pages/ssin/ssin.component';
import {UuidComponent} from './pages/uuid/uuid.component';


const routes: Routes = [
  { path: '', redirectTo: '/nihii', pathMatch: 'full' },
  { path: 'nihii', component: NihiiComponent },
  { path: 'ssin', component: SsinComponent },
  { path: 'uuid', component: UuidComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
