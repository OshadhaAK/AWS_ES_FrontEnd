import { Injectable } from '@angular/core';
import * as elasticsearch from 'elasticsearch-browser';
import { from } from 'rxjs';
import { Client } from 'elasticsearch-browser';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private client: Client;

  constructor() { 
  
    if (!this.client) {
      this._connect();
    }
  }

  // private connect() {
  //   this.client = new Client({
  //     host: 'http://localhost:9200',
  //     log: 'trace'
  //   });
  // }
  private _connect() {
    this.client = new elasticsearch.Client({
      host: 'http://localhost:9200',
      log: 'trace'
    });
  }
  isAvailable(): any {
    return this.client.ping({
      requestTimeout: Infinity,
      body: 'hello grokonez!'
    });
  }

  fullTextSearch(_index, _field, _queryText): any {
    return this.client.search({
      index: _index,
      filterPath: ['hits.hits._source', 'hits.total', '_scroll_id'],
      body: {
        'query': {
          'match_phrase_prefix': {
            [_field]: _queryText,
          }
        }
      },
      '_source': ['downloadFormats', 'downloads', 'lyrics', 'mainArtist', 'music', 'song', 'url', 'videoURI', 'visits']
    });
  }
  
}

