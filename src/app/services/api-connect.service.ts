import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';
import { API_URL } from './api-url-config';
import { ConfigurationFormat } from '../ConfigurationFormat';

@Injectable()
export class ApiConnectService {
    constructor(private http: HttpClient, private router: Router) { }

    public login() {
        return this.http
        .get(API_URL + '/login', { responseType: 'text' })
        .pipe(catchError(this.handleError));
    }

    public signUp() {
        return this.http
        .get(API_URL + '/signup')
        .pipe(catchError(this.handleError));
    }

    public logout() {
        return this.http
        .get(API_URL + '/logout')
        .pipe(catchError(this.handleError));
    }

    public test() {
        return this.http
        .get(API_URL + '/testing')
        .pipe(catchError(this.handleError));
    }

    public generate(config: ConfigurationFormat) {
        return this.http
            .post(API_URL + '/generate', {teamDesires: config, responseType: 'JSON'})
            .pipe(catchError(this.handleError));
    }

    // Retrieve a user's bot scripts from the back-end db
    public retrieveUserBotScripts(user, limitAmount ) {
        let query: string;
        if (limitAmount > 0) {
            query = 'SELECT * FROM DBNAME WHERE dbname.user = ' + user + ' ORDER BY dbname.date-last-edit LIMIT ' + limitAmount;
        } else {
            query = 'SELECT * FROM DBNAME WHERE dbname.user = ' + user + ' ORDER BY dbname.date-last-edit';
        }

        return this.http
            .post(API_URL + '/retrieve', {query, responseType: 'JSON'})
            .pipe(catchError(this.handleError));
    }

    // Add new user bot
    public addUserBotScript(user, botConfig: ConfigurationFormat, botName, botDescrip ) {
        let query: string;
        query = 'INSERT INTO DBNAME (user, bot_Name, bot_Descrip, bot_config ,bot_last_edit)' +
                ' VALUES (' + user + ',' + botName + ',' + botDescrip + ',' + botConfig + ', CURRENT_TIMESTAMP )'  ;

        return this.http
            .post(API_URL + '/insert', {query, responseType: 'JSON'})
            .pipe(catchError(this.handleError));
    }

    // update an existing user bot
    public updateUserBotScript(user, botConfig: ConfigurationFormat, botName, botDescrip ) {
        let query: string;
        query = 'UPDATE DBNAME' +
                ' WHERE db.user = ' + user + ' AND db.botID = botID ' +
                ' SET db.bot_Name =' + botName + ', db.bot_Descrip =' + botDescrip +
                    ', db.bot_Config =' + botConfig + ', db.bot_last_edit = CURRENT_TIMESTAMP )'  ;

        return this.http
            .post(API_URL + '/update', {query, responseType: 'JSON'})
            .pipe(catchError(this.handleError));
    }

    // delete an existing bot script
    public deleteUserBotScript(user, botID, ) {
        let query: string;
        query = 'DELETE FROM DBNAME ' +
                'WHERE db.user = ' + user + ' AND db.botID =' + botID + ')'  ;

        return this.http
            .post(API_URL + '/delete', {query, responseType: 'JSON'})
            .pipe(catchError(this.handleError));
    }

    // Handle errors if any 
    private handleError(err: HttpErrorResponse | any) { 
        console.error('An error occurred', err); 
        return Observable.throw(err.message || err); 
    } 

}
