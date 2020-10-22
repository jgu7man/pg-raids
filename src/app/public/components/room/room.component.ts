import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { scan, takeWhile } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { RoomModel, RoomMember } from '../../models/room.model';
import { RoomsService } from '../../services/rooms.service';
import { CacheService } from '../../../Gdev-Tools/cache/cache.service';

@Component({
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  room: RoomModel
  host: RoomMember = {
    nickname:'', pg_code:''
  }

  now = new Date().getTime()
  future: number

  timer$: Observable<any>
  
  constructor (
    private _route: ActivatedRoute,
    private _rooms: RoomsService,
    private _cache: CacheService,
    private _dialog: MatDialog
  ) {
    this.room = new RoomModel( '', '', '', new Date, this.host, '', [], [], [] )
    this.room.id = this._route.snapshot.params[ 'id' ]
   }

  async ngOnInit() {
    this.room   = await this._rooms.getRoom( this.room.id )
    this.future = this.room.match_hour.getTime()
    
    
    
    this.timer$ = timer( 0, 1000 ).pipe(
      scan( acc => --acc, this.secondsToMatch() ),
      takeWhile( x => x >= 0 )
    )
  }

  
  addMember( list: 'placed' | 'remote' | 'invited' ) {
    let player = this._cache.getDataKey('player')
    switch (list) {
      case 'placed':
        this.room.placed_members.push(player)
        break;
      case 'remote':
        this.room.remote_members.push( player )
        break;
      case 'invited':
        this.room.invited_members.push( player )
        break;
    }
    this._rooms.updateRoom(this.room)
  }

  requestInvite() {
     
  }


  secondsToMatch() {
    var delta = Math.abs( this.future - this.now ) / 1000;
    return Math.ceil( delta )
  }

}
