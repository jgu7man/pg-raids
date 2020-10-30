import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RoomModel, RoomMember } from '../models/room.model';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { CacheService } from '../../Gdev-Tools/cache/cache.service';
import { AlertService } from '../../Gdev-Tools/alerts/alert.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  
  roomList: Observable<RoomModel[]>
  constructor (
    private fs: AngularFirestore,
    private router: Router,
    private _cache: CacheService,
    private _alerts: AlertService
  ) {
    this.get()
   }

  async addRoom( room: RoomModel ) {
    await this.fs.collection( 'rooms' ).ref
      .doc( room.id ).set( { ...room } )
      .then( () => {
        this.router.navigate( [ 'sala', room.id ] )
      } )
    this._cache.updateData( 'room-hosted', room )
    
  }

  get() {
    this.roomList = this.fs.collection<RoomModel>('rooms').valueChanges()
      .pipe(switchMap( list =>{ return list.length > 0 ? of( list) : of([])}))
  }

  async getRoom(id: string) {
    let doc = await this.fs.collection( 'rooms' ).ref
      .doc( id ).get()
    
    if ( doc.exists ) {
      let room = doc.data() as RoomModel
      room.match_hour = doc.data().match_hour.toDate()
      return room
    }
  }


  updateRoom(room: RoomModel) {
    this.fs.collection('rooms').ref.doc(room.id).set({...room}, {merge: true})
  }


  addMember(list: 'placed' | 'remote' | 'invited', room: RoomModel, player?:RoomMember) {

      player = player ? player : this._cache.getDataKey('player')

      let memberList: RoomMember[] = room[`${list}_members`]
      memberList.push(player)

    this.updateRoom(room)
    
    if (list == 'invited') {
      this._alerts.sendMessageAlert('Toca el nombre del usuario que te va a invitar para copiar su código y ve al juego para enviarle una solicitud de amistad.')
    } else {
      
      this._alerts.sendFloatNotification('Agregado')
    }


  }



  deleteRoom(roomId:string) {
    this.fs.collection('rooms').ref.doc(roomId).delete()
    this._cache.deleteDataKey('room-hosted')
    this.router.navigate(['/'])
  }

}
