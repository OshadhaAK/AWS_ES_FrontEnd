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
  nameSearch: any;
  lyricsSearch: any;

  private static INDEX :any;
 
 
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
    if(this.lyrics == '1'){
      AppComponent.INDEX = 'lyricalSongs'

    }else if (this.lyrics == '2') {
      AppComponent.INDEX = 'songs'
    } else {
      AppComponent.INDEX = ''
      console.error('Incorrect Index');
    }
  }

  searchSong(entry) {
    this.name = entry
    console.log(this.name)
    if(this.name == '3'){
      this.nameSearch = 'song'
    }
    else if (this.name == '4') {
      this.nameSearch = 'mainArtist'
    } else {
      this.nameSearch = ''
      console.error('Incorrect name search');
    }
  }

  goToLink(url: string){
    window.open("http://"+url, "_blank");
  }


  search($event) {
    if ($event.timeStamp - this.lastKeypress > 100) {
      this.queryText = $event.target.value;
      this.searchService.fullTextSearch(
        AppComponent.INDEX,
        this.nameSearch, this.queryText).then(
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

