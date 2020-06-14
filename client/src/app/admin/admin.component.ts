import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiStatusResponse } from '../interfaces/ApiStatusResponse';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  title = '';
  content = '';
  shortContent = '';
  handleAdd = () => {
    console.log({
      title: this.title,
      shortContent: this.content.slice(0, 120),
      longContent: this.content,
    });
  };
  status = '';

  constructor(httpClient: HttpClient) {
    httpClient
      .get(`${environment.appUrl}/api/status`)
      .toPromise()
      .then((data: ApiStatusResponse) => {
        this.status = data.status;
      })
      .catch((error) => {
        console.warn(error);
        this.status = 'not operational';
      });
  }

  ngOnInit(): void {}
}
