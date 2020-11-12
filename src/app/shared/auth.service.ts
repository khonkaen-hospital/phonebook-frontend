import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private http: HttpClient,
  ) { }

  login(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl + `/login`, {
      usesrname: credentials.usesrname,
      password: credentials.password
    })
  }
}
