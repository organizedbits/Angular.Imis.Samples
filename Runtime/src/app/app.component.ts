import { Component, OnInit } from '@angular/core';
import { Settings } from './models/settings.model';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  settings: Settings;

  constructor(private http: Http) {
    this.settings = new Settings();
  }

  async ngOnInit() {

    const contentKey = document.querySelector('#runtimecontainer').getAttribute('data-asi-contentkey');

    const contentItemKey = document.querySelector('#runtimecontainer').getAttribute('data-asi-contentitemkey');

    this.settings =  await this.getSettings(contentKey, contentItemKey);
  }

  async getSettings(contentKey: string, contentItemKey: string): Promise<Settings> {

    const host = window.location.host;
    let provider = `${host}`;
    let  virtualDirectory = '';

    const hasVirtualDirectory = document.querySelector('script[src^="/AsiCommon"]') === null;

    if (hasVirtualDirectory) {
      virtualDirectory = window.location.href.split('/')[3];
      provider = `${provider}${virtualDirectory}`;
      virtualDirectory = `/${virtualDirectory}`;
    }

    const options = new RequestOptions({
      headers: new Headers({ 'RequestVerificationToken': document.querySelector('#__RequestVerificationToken').getAttribute('value')})
    });

    let resp: Response;

    try {
     resp =  await this.http
     .get(`${virtualDirectory}/api/ContentItem?ContentKey=${contentKey}&ContentItemKey=${contentItemKey}`, options).toPromise();
    } catch (e) {
     resp =  await this.http
     .get(`${virtualDirectory}/api/ContentTypeSettings?ContentKey=${contentKey}&ContentItemKey=${contentItemKey}`, options).toPromise();
    }

    return resp.json().Settings;

  }
}
