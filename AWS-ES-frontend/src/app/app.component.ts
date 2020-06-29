import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SearchService } from '../app/search.service'
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SongSource } from './song'
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


  private static readonly INDEX = 'songs';
  private static readonly TYPE = '';
 
  songSources: SongSource[];
  private queryText = '';
 
  private lastKeypress = 0;


  constructor(private searchService: SearchService, private cd: ChangeDetectorRef, private http: HttpClient) {
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

  // onSearchChange(searchValue) {
  //   console.log(searchValue)
  // }
  search($event) {
    if ($event.timeStamp - this.lastKeypress > 100) {
      this.queryText = $event.target.value;
      this.searchService.fullTextSearch(
        AppComponent.INDEX,
        AppComponent.TYPE,
        'mainArtist', this.queryText).then(
          response => {
            this.songSources = response.hits.hits;
            console.log("response",response);
          }, error => {
            console.error(error);
          }).then(() => {
            console.log('Search Completed!');
          });
    }
 
    this.lastKeypress = $event.timeStamp;
  }
}

