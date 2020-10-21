import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RoomModel } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor (
    private fs: AngularFirestore
  ) { }

  async addRoom( room: RoomModel ) {
    await this.fs.collection( 'rooms' ).add( { ...room } )
    
  }
}
