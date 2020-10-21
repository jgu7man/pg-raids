import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomModel } from './models/room.model';
import { RoomComponent } from './components/room/room.component';


const routes: Routes = [
  {path: '', component: PublicComponent, children: [
    { path: '', redirectTo: 'list', pathMatch: 'full'},
    { path: 'list', component: RoomListComponent },
    { path: 'nueva', component: CreateRoomComponent },
    { path: 'sala/:id', component: RoomComponent}
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
