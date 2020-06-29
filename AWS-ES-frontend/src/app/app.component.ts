import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SearchService } from '../app/search.service'
import { from } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  lyrics: any;
  name: any;
  isConnected = false;
  status: string;

  constructor(private searchService: SearchService, private cd: ChangeDetectorRef) {
    this.isConnected = false;
  }


  ngOnInit() {
    this.searchService.isAvailable().then(() => {
      this.status = 'OK';
      this.isConnected = true;
    }, error => {
      this.status = 'ERROR';
      this.isConnected = false;
      console.error('Server is down', error);
    }).then(() => {
      this.cd.detectChanges();
    });

  }

  searchLyrics(entry) {
    this.lyrics = entry
    console.log(this.lyrics)
  }

  searchSong(entry) {
    this.name = entry
    console.log(this.name)
  }

  onSearchChange(searchValue) {
    console.log(searchValue)
  }
}

