import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiStatusResponse } from './interfaces/ApiStatusResponse';
import { environment } from 'src/environments/environment';

@Injectable()
export class apiService {
  constructor(httpClient: HttpClient) {
    // httpClient
    //   .get(`${environment.appUrl}/api/status`)
    //   .toPromise()
    //   .then((data: ApiStatusResponse) => {
    //     this.status = data.status;
    //   })
  }

  getStatus(): Promise<ApiStatusResponse> {
    return this.httpClient
      .get(`${environment.appUrl}/api/status`)
      .toPromise()
      .catch((error) => {
        console.warn(error);
        this.status = 'not operational';
      });
  }
}
