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

   }

  ngOnInit(): void {
    let host = this._cache.getDataKey( 'host' )
    console.log( host );
    if ( !host )
      this._dialog.open( GetNicknameComponent, {
        minWidth: 300
      })
  }

}
