import { Component, OnInit } from '@angular/core';
import { RoomModel } from '../../models/room.model';
import { RoomsService } from '../../services/rooms.service';

@Component({
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  rooms: RoomModel

  constructor (
    public room_: RoomsService
  ) { }

  ngOnInit(): void {
    this.room_.roomList.subscribe( rooms => {
      console.log(rooms);
    })
  }

}
