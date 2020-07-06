import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../apiService';
import { Post } from './../post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  post: Post = null;

  constructor(activatedRoute: ActivatedRoute, apiService: ApiService) {
    activatedRoute.params.subscribe((params) => {
      apiService.getSinglePost(params.id).then((post) => (this.post = post));
    });
  }
}
