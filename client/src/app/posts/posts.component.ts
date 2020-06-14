import { Component, OnInit } from '@angular/core';
import { Post, postData } from './../post';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiStatusResponse } from '../interfaces/ApiStatusResponse';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {
  posts = [];

  constructor(httpClient: HttpClient) {
    httpClient
      .get(`${environment.appUrl}/api/posts`)
      .toPromise()
      .then((data: any) => {
        this.posts = data;
      })
      .catch((error) => {
        console.warn(error);
        this.posts = [
          {
            title: 'Error',
            shortContent: 'Could not retrieve data about posts',
            longContent: 'Could not retrieve data about posts',
          },
        ];
      });
  }
}
