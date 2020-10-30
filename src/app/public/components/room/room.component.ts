import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { scan, takeWhile } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { RoomModel, RoomMember } from '../../models/room.model';
import { RoomsService } from '../../services/rooms.service';
import { CacheService } from '../../../Gdev-Tools/cache/cache.service';
import { AlertService } from '../../../Gdev-Tools/alerts/alert.service';
import { AddMemberComponent, MemberAdded } from './add-member/add-member.component';
import { DeleteRoomComponent } from './delete-room/delete-room.component';

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
    private _dialog: MatDialog,
    private _alerts: AlertService
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

  validateMembers(list: "placed" | "remote" | "invited", member?: RoomMember) {
    let localMembers = this.room.placed_members.length + this.room.remote_members.length
    let invitedLimit = localMembers * 5

    if (this.room.remote_members.length > 9 && list == 'remote') {
      return this._alerts.sendMessageAlert('No puede haber más de 8 remotos en una sala')
    
    } else if (invitedLimit < this.room.invited_members.length && list == 'invited') {
      return this._alerts.sendMessageAlert('No puede haber más invitados de los que pueden ser invitados por los presenciales')
    
    } else if (localMembers + this.room.invited_members.length > 20) {
      return this._alerts.sendMessageAlert('La sala está llena, intenta en otra')
    
    } else {
      return this._rooms.addMember(list, this.room, member ? member : null)
    }
  }

  
  openAddMember() {
    var addMemberDialog = this._dialog.open(AddMemberComponent, {
      width: '350px'
    })

    addMemberDialog.afterClosed().subscribe((result: MemberAdded) => {
      if (result) { this.validateMembers(result.list, result.player) }
    })
  }
  

  deleteMember(list: 'placed' | 'remote' | 'invited') {
    let player = this._cache.getDataKey('player')
    let memberList: RoomMember[] = this.room[`${list}_members`]
    
    let playerIndex = memberList.findIndex(m => m.pg_code == player.pg_code);
    
    memberList.splice(playerIndex, 1)
    this._rooms.updateRoom(this.room)
  }

  

  isHost() {
    let player: RoomMember = this._cache.getDataKey('player')
    return this.room.host.pg_code == player.pg_code ? true : false
  }


  secondsToMatch() {
    var delta = Math.abs( this.future - this.now ) / 1000;
    return Math.ceil( delta )
  }



  eliminarSala() {
    this._dialog.open(DeleteRoomComponent, {
      minWidth: 300,
      data:this.room.id
    })
  }

}
