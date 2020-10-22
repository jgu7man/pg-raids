import { Component, OnInit } from '@angular/core';
import { RoomMember } from '../../models/room.model';
import { CacheService } from '../../../Gdev-Tools/cache/cache.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Loading } from '../../../Gdev-Tools/loading/loading.service';

@Component({
  templateUrl: './get-nickname.component.html',
  styleUrls: ['./get-nickname.component.scss']
})
export class GetNicknameComponent implements OnInit {


  getData: boolean = true
  member: RoomMember = {
    nickname: '', pg_code: ''
  }
  constructor (
    private _cache: CacheService,
    private _dialog: MatDialogRef<GetNicknameComponent>,
    private loading: Loading
  ) { }

  async ngOnInit() {
    
  }

  async onSave() {
    this._cache.updateData( 'player', this.member )
    this.getData = false
    await this.loading.waitFor( 2000 )
    this._dialog.close()
  }

}
