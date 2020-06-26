import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  lyrics: any;
  name: any;
 

  constructor() {
    
  }






  ngOnInit() {
    

  }

  searchLyrics(entry){
    this.lyrics = entry
    console.log(this.lyrics)
  }

  searchSong(entry){
    this.name = entry
    console.log(this.name)
  }

  onSearchChange(searchValue){
    console.log(searchValue)
  }
}

