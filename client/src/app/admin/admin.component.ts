import { Component, OnInit } from '@angular/core';
import { ApiService } from '../apiService';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  title = '';
  longContent = '';
  accessToken = null;
  posts = [];

  constructor(private apiService: ApiService) {
    this.accessToken = localStorage.getItem('accessToken');
  }

  ngOnInit(): void {
    this.apiService.getPosts().then((posts) => (this.posts = posts));
  }

  handleSave() {
    const doc: any = {
      title: this.title,
      shortContent: this.longContent.slice(0, 120),
      longContent: this.longContent,
    };

    this.apiService.createPost(doc).then(() => window.location.reload());
  }

  handleDelete(id: string) {
    this.apiService.deletePost(id).then(() => {
      window.location.reload();
    });
  }
}
