import { Component, OnInit } from '@angular/core';
import { RoomModel, RoomMember } from '../../models/room.model';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {

  

  

  room: RoomModel
  host: RoomMember
  constructor (
    public dialog: MatDialogRef<CreateRoomComponent>,
    private fs: AngularFirestore
  ) {
    this.room = new RoomModel('','','', new Date(), this.host)
   }

  ngOnInit(): void {
  }

  setTime() {
    
  }

  

  async onSubmit() {
    const t = new Date()
    const roomId = `
    ${ t.getFullYear() }
    ${ t.getMonth() }
    ${ t.getDate() }
    ${ t.getHours() }
    ${ t.getMinutes() }
    ${ t.getSeconds() }
    `
    await this.fs.collection( 'rooms' ).ref
      .doc( roomId ).set( { ...this.room } )
    this.dialog.close()
  }

}
