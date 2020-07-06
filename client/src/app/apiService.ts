import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ApiStatusResponse } from './interfaces/ApiStatusResponse';
import { Post } from './post';

@Injectable()
export class ApiService {
  accessToken = null;

  constructor(private httpClient: HttpClient) {
    this.accessToken = localStorage.getItem('accessToken');
  }

  private get httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${this.accessToken}`,
      }),
    };
  }

  getStatus(): Promise<ApiStatusResponse> {
    return this.httpClient
      .get<ApiStatusResponse>(`${environment.appUrl}/api/status`)
      .toPromise();
  }

  getPosts(): Promise<Array<Post>> {
    return this.httpClient
      .get<Array<Post>>(`${environment.appUrl}/api/posts`)
      .toPromise();
  }

  getSinglePost(id: string): Promise<Post> {
    return this.httpClient
      .get<Post>(`${environment.appUrl}/api/posts/${id}`)
      .toPromise();
  }

  createPost(doc: Post): Promise<any> {
    return this.httpClient
      .post<Post>(`${environment.appUrl}/api/posts`, doc, this.httpOptions)
      .toPromise();
  }

  updatePost(doc: Post): Promise<number> {
    return this.httpClient
      .put<number>(
        `${environment.appUrl}/api/posts/${doc.id}`,
        doc,
        this.httpOptions
      )
      .toPromise();
  }

  deletePost(id: string): Promise<number> {
    return this.httpClient
      .delete<number>(`${environment.appUrl}/api/posts/${id}`, this.httpOptions)
      .toPromise();
  }

  userLogin(email: string, password: string): Promise<any> {
    return this.httpClient
      .post(`${environment.appUrl}/api/login`, {
        token: btoa(`${email}:${password}`),
      })
      .toPromise();
  }
}
