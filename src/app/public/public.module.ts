import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material.module';
import { FirebaseModule } from './../firebase.module';
import { GdevToolsModule } from './../Gdev-Tools/gdev-tools.module';
import {ShareModule} from 'ngx-sharebuttons';
import {TextMaskModule} from 'angular2-text-mask';

import { PublicComponent } from './public.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PublicRoutingModule } from './public-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { RoomListComponent } from './components/room-list/room-list.component';
import { RoomComponent } from './components/room/room.component';
import { GetNicknameComponent } from './components/get-nickname/get-nickname.component';
import { AddMemberComponent } from './components/room/add-member/add-member.component';
import { DeleteRoomComponent } from './components/room/delete-room/delete-room.component';
import { ShareRoomComponent } from './components/room/share-room/share-room.component';
import { CountdownComponent } from './components/countdown/countdown.component';


@NgModule({
  declarations: [
    PublicComponent,
    CreateRoomComponent,
    ToolbarComponent,
    RoomListComponent,
    RoomComponent,
    GetNicknameComponent,
    AddMemberComponent,
    DeleteRoomComponent,
    ShareRoomComponent,
    CountdownComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PublicRoutingModule,
    CommonModule,
    MaterialModule,
    FirebaseModule,
    GdevToolsModule,
    NgxMaterialTimepickerModule,
    ShareModule,
    TextMaskModule
  ],
  entryComponents: [GetNicknameComponent, AddMemberComponent, DeleteRoomComponent, ShareRoomComponent]
})
export class PublicModule { }
