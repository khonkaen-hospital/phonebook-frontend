import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SerivceService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    @Inject('API_URL') private apiUrl: string,
    @Inject('API_URL_LOGIN') private apiUrlLogin: string,
    private http: HttpClient,
    private router: Router
  ) { }

  async decodeToken(token: string) {
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['/']);
    } else {
      return this.jwtHelper.decodeToken(token);
    }
  }

  find(data: any): Observable<any> {
    return this.http.post(this.apiUrl, { data });
  }

  login(data: any): Observable<any> {
    return this.http.post(this.apiUrlLogin, data);
  }

  updatePhone(data: any): Observable<any> {
    return this.http.put(this.apiUrl, { data });
  }

  department(): Observable<any> {
    return this.http.get(this.apiUrl + `/department`);
  }

  checkNumber(no: any): Observable<any> {
    return this.http.get(this.apiUrl + `/cNumber/${no}`)
  }

  build(): Observable<any> {
    return this.http.get(this.apiUrl + `/build`);
  }

  floor(): Observable<any> {
    return this.http.get(this.apiUrl + `/floor`);
  }

  phone(code: any): Observable<any> {
    return this.http.get(this.apiUrl + `/phone/${code}`);
  }

  responder(data: any): Observable<any> {
    return this.http.post(this.apiUrl + `/responder`, { data });
  }

  softphones(data: any): Observable<any> {
    return this.http.post(this.apiUrl + `/softphones`, { data });
  }

}
