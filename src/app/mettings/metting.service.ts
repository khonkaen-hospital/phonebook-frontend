import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MettingService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private http: HttpClient
  ) {
    this.apiUrl += '/metting';
  }

  listMetting(data: any): Observable<any> {
    return this.http.post(this.apiUrl + `/list`, { data });
  }

  addMetting(data: any): Observable<any> {
    return this.http.post(this.apiUrl, { data });
  }

  editMetting(data: any): Observable<any> {
    return this.http.patch(this.apiUrl, { data });
  }

  deleteMetting(id: number) {
    return this.http.delete(this.apiUrl + `/${id}`);
  }

  getLevel(id: number): Observable<any> {
    return this.http.get(this.apiUrl + `/level/${id}`);
  }

  getStatus(): Observable<any> {
    return this.http.get(this.apiUrl + `/status`);
  }

}
