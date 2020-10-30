import { Component, OnInit } from '@angular/core';
import { RoomModel } from '../../models/room.model';
import { RoomsService } from '../../services/rooms.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  rooms: RoomModel

  constructor (
    public room_: RoomsService,
    private fs: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.room_.roomList.subscribe(rooms => {
      var today = new Date()
      rooms.forEach(room => {
        let match = new Date( room.match_hour['seconds'] * 1000 )
        let afterMatch = new Date(
          match.getFullYear(),
          match.getMonth(),
          match.getDate(),
          match.getHours() + 1,
          match.getMinutes(),
        )

        if (afterMatch < today) {

          console.log('sala expirada');
          this.fs.collection('rooms').ref.doc(room.id).delete()
        }
      })
    })
  }

  

}
