import { Component, OnInit } from '@angular/core';
import { Post, postData } from './../post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {
  posts = postData;

  constructor() {}
}
