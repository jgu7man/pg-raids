import { Component, OnInit } from '@angular/core';
import { RoomModel, RoomMember } from '../../models/room.model';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertService } from '../../../Gdev-Tools/alerts/alert.service';
import { Router } from '@angular/router';
import { CacheService } from '../../../Gdev-Tools/cache/cache.service';
import { TextService } from '../../../Gdev-Tools/text/gdev-text.service';

@Component({
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {

  
  room: RoomModel
  host: RoomMember
  
  constructor (
    private fs: AngularFirestore,
    private _alerts: AlertService,
    private router: Router,
    private _cache: CacheService,
    private _text: TextService
  ) {
    this.host = this._cache.getDataKey( 'host' )
    this.room = new RoomModel( '', '', '', new Date(), this.host )
   }

  ngOnInit(): void {
  }

  get Now() {
    return new Date()
  }

  transformNow(h,m) {
    return new Date(
      this.Now.getFullYear(),
      this.Now.getMonth(),
      this.Now.getDate(),
      this.Now.getHours() + h,
      this.Now.getMinutes() + m,
    )
  }

  stringNow() {
    return `${ this.Now.getFullYear() }${ this.Now.getMonth()+1 }${ this.Now.getDate() }${ this.Now.getHours() }${ this.Now.getMinutes() }`
  }


  formatTime(date: Date) {
    return this._text.stringifyTime(date)
  }

  setTime(matchTime) {
    // console.log( matchTime );
    var hour = matchTime.split( ':' )[ 0 ]
    var min = matchTime.split( ':' )[ 0 ]

    this.room.match_hour = new Date(
      this.Now.getFullYear(),
      this.Now.getMonth(),
      this.Now.getDate(),
      hour, min
    )
  }

  

  async onSubmit() {
    
    const roomId = this.stringNow()
    var lapse = this.transformNow( 0, 20 )
    var over = this.transformNow(0,120)
    console.log(lapse, this.room.match_hour);

    if ( lapse > this.room.match_hour ) {
      this._alerts.sendMessageAlert( 'Debes darle un tiempo mínimo de 20 minutos para que se junten los participantes' )
      
    } else if(over > this.room.match_hour) {
      this._alerts.sendMessageAlert('No es posible agendar una incursión que no existe aún')

    } else {
      Object.keys(this.room).forEach(key => { if (this.room[key] == undefined) delete this.room[key]})      
      await this.fs.collection( 'rooms' ).ref
        .doc( roomId ).set( { ...this.room } )
        .then( () => {
          this.router.navigate(['sala', roomId])
      })
      this._cache.updateData('room-hosted', this.room)
      
      
    }

  }

}
