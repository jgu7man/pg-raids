import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MembersService } from './services/members.service';
import { CacheService } from '../Gdev-Tools/cache/cache.service';
import { GetNicknameComponent } from './components/get-nickname/get-nickname.component';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {


  constructor (
    private _cache: CacheService,
    private _dialog: MatDialog
  ) {
    this._cache.storage = 'local'
   }

  ngOnInit(): void {
    let player = this._cache.getDataKey( 'player' )
    console.log( player );
    if ( !player )
      this._dialog.open( GetNicknameComponent, {
        disableClose: true,
        minWidth: 300
      })
  }

}
