import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RoomModel } from '../models/room.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CacheService } from '../../Gdev-Tools/cache/cache.service';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  
  roomList: Observable<RoomModel[]>
  constructor (
    private fs: AngularFirestore,
    private router: Router,
    private _cache: CacheService
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


}
