import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material.module';
import { FirebaseModule } from './../firebase.module';
import { GdevToolsModule } from './../Gdev-Tools/gdev-tools.module';

import { PublicComponent } from './public.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PublicRoutingModule } from './public-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


@NgModule({
  declarations: [
    PublicComponent,
    CreateRoomComponent,
    ToolbarComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PublicRoutingModule,
    CommonModule,
    MaterialModule,
    FirebaseModule,
    GdevToolsModule,
    NgxMaterialTimepickerModule
  ]
})
export class PublicModule { }
