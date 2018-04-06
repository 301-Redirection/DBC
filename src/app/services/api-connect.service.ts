import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw'; 

@Injectable()
export class ApiConnectService {

  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }
  
  public login() {
    return this.http
      .get(this.apiUrl + '/login')
      .pipe(catchError(this.handleError));
  }

  public signUp() {
    return this.http
      .get(this.apiUrl + '/signup')
      .pipe(catchError(this.handleError));
  }

  public logout() {
    return this.http
      .get(this.apiUrl + '/logout')
      .pipe(catchError(this.handleError));
  }

  public test() { 
    return this.http 
      .get(this.apiUrl + '/testing') 
      .pipe(catchError(this.handleError)); 
  } 

  // Handle errors if any
  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return Observable.throw(err.message || err);
  }

}
