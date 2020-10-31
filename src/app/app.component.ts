import { Component } from '@angular/core';
import { CacheService } from './Gdev-Tools/cache/cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pg-raids';
  constructor (
    private _cache: CacheService
  ) {
    this._cache.cacheTagName = 'pg-raids'
  }
}
