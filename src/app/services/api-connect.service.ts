import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { API_URL } from './api-url-config';
import { ConfigurationFormat } from '../ConfigurationFormat';

@Injectable()
export class ApiConnectService {
    constructor(private http: HttpClient, private router: Router) {
        this.http = http;
        this.router = router;
    }

    private get authHeader(): string {
        return `Bearer ${localStorage.getItem('access_token')}`;
    }

    public login() {
        return this.http
            .get(`${API_URL}/login`, { responseType: 'text' })
            .pipe(catchError(this.handleError));
    }

    public signUp() {
        return this.http
            .get(`${API_URL}/signup`)
            .pipe(catchError(this.handleError));
    }

    public logout() {
        return this.http
            .get(`${API_URL}/logout`)
            .pipe(catchError(this.handleError));
    }

    public test() {
        return this.http
            .get(`${API_URL}/test`, {
                headers: new HttpHeaders().set('Authorization', this.authHeader),
            })
            .pipe(catchError(this.handleError));
    }

    public generate(config: ConfigurationFormat) {
        return this.http
            .post(`${API_URL}/generate`, { 
                teamDesires: config, 
                responseType: 'JSON',
                headers: new HttpHeaders().set('Authorization', this.authHeader),
            })
            .pipe(catchError(this.handleError));
    }

    // Handle errors if any
    private handleError(err: HttpErrorResponse | any) {
        return Observable.throw(err.message || err);
    }
}

export default 'ApiConnectService';
