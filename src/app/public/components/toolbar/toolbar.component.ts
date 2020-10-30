import { Component, OnInit } from '@angular/core';
import { CacheService } from '../../../Gdev-Tools/cache/cache.service';
import { RoomModel } from '../../models/room.model';

@Component( {
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  room: RoomModel
  constructor (
    private _cache: CacheService
  ) {
    
    this.room = this._cache.getDataKey('room-hosted')
   }

  ngOnInit(): void {
    console.log(this.validateTime);
  }

  get validateTime() {
    var today = new Date()
    var roomTime = new Date(this.room.match_hour)
    return today < roomTime ? true : false
  }
  
}
