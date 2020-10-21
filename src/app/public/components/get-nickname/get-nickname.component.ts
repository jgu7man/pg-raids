import { Component, OnInit } from '@angular/core';
import { RoomMember } from '../../models/room.model';
import { CacheService } from '../../../Gdev-Tools/cache/cache.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './get-nickname.component.html',
  styleUrls: ['./get-nickname.component.scss']
})
export class GetNicknameComponent implements OnInit {

  member: RoomMember = {
    nickname: '', pg_code: ''
  }
  constructor (
    private _cache: CacheService,
    private _dialog: MatDialogRef<GetNicknameComponent>
  ) { }

  ngOnInit(): void {
  }

  onSave() {
    this._cache.updateData( 'host', this.member )
    this._dialog.close()
  }

}
