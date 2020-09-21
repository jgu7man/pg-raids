import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateRoomComponent } from '../create-room/create-room.component';

@Component( {
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor (
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onCreateRoom() {
    var dialog = this.dialog.open( CreateRoomComponent, {
      width: "320px"
    })
  }

}
