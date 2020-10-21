import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { scan, takeWhile } from 'rxjs/operators';

@Component({
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  
  now = new Date().getTime()
  future = new Date( 2020, 9, 21, 11, 40, 0 ).getTime() // obtener hora de la base de datos

  timer$ = timer( 0, 1000 ).pipe(
    scan( acc => --acc, this.secondsToMatch() ),
    takeWhile( x => x >= 0 )
  )
  
  constructor () { }

  ngOnInit(): void {
  }



  secondsToMatch() {
    var delta = Math.abs( this.future - this.now ) / 1000;
    return Math.ceil( delta )
  }

}
