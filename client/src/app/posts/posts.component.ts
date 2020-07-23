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

  // compare = (a, b) => {
  //   let comparison = 0;
  //   const reverse = -1;
  //   if (a.createdAt > b.createdAt) {
  //     comparison = 1;
  //   } else if (a.createdAt < b.createdAt) {
  //     comparison = -1;
  //   }
  //   return comparison * reverse;
  // };

  constructor(apiService: ApiService) {
    apiService.getPosts().then((data) => {
      this.data = data;
    });
  }

  ngOnInit(): void {}
}
