import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../apiService';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  data = null;

  constructor(apiService: ApiService) {
    apiService.getPosts().then((data) => {
      this.data = data;
    });
  }

  ngOnInit(): void {}
}
