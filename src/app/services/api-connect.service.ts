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
            .get(`${API_URL}/testAuthentication`, {
                headers: new HttpHeaders().set('Authorization', this.authHeader),
            })
            .pipe(catchError(this.handleError));
    }

    public recentBots() {
        return this.http
            .get(`${API_URL}/bots/recent`, {
                headers: new HttpHeaders().set('Authorization', this.authHeader),
            })
            .pipe(catchError(this.handleError));
    }

    public specificBot(botScriptID: number) {
        console.log(this.authHeader);
        return this.http
            .get(`${API_URL}/bots/get?id=` + botScriptID, {
                headers: new HttpHeaders().set('Authorization', this.authHeader),
            })
            .pipe(catchError(this.handleError));
    }
    // Handle errors if any 
    private handleError(err: HttpErrorResponse | any) { 
        console.error('An error occurred', err); 
        return Observable.throw(err.message || err); 
    } 

    public updateBot(config: ConfigurationFormat) {
        const httpHeaders = {
            headers: new HttpHeaders({
                Authorization: this.authHeader,
            }),
        };
        return this.http
            .post(`${API_URL}/bots/update`, { bot: config }, httpHeaders)
            .pipe(catchError(this.handleError));
    }

    // public generate(config: ConfigurationFormat) {
    //     return this.http
    //         .post(`${API_URL}/generate`, { 
    //             teamDesires: config, 
    //             responseType: 'JSON',
    //             headers: new HttpHeaders().set('Authorization', this.authHeader),
    //         })
    //         .pipe(catchError(this.handleError));
    // }
}

export default 'ApiConnectService';
