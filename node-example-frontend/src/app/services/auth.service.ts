import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginUser } from '../models/login-user';
import { User } from '../models/user';
const api = environment.api;

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(
        private http: HttpClient,
        public router: Router
    ) {
    }

    // Sign-up
    signUp(user: User): Observable<any> {
        let url = `${api}/api/signup`;
        return this.http.post(url, user).pipe(catchError(this.handleError));
    }

    // Sign-in
    signIn(user: LoginUser): Observable<any> {
        let url = `${api}/api/login`;
        return this.http.post<any>(url, user).pipe(catchError(this.handleError));
    }

    doLogout() {
        let removeToken = localStorage.removeItem('access_token');
        if (removeToken == null) {
            this.router.navigate(['log-in']);
        }
    }

    // User profile
    getUserProfile(): Observable<any> {
        let url = `${api}/api/username`;
        return this.http.get(url, { params: new HttpParams().append('token', this.getToken()), responseType: 'text' }).pipe(catchError(this.handleError))
    }

    get isLoggedIn(): boolean {
        let authToken = this.getToken();
        return (authToken !== null) ? true : false;
    }

    getToken() {
        return localStorage.getItem('access_token');
    }

    setToken(token: string) {
        token = token.toString();
        localStorage.setItem('access_token', token);
    }

    // Error 
    handleError(error: HttpErrorResponse) {
        let msg = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            msg = error.error.message;
        } else {
            // server-side error
            msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(msg);
    }
}