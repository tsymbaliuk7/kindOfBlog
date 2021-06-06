import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpOptions: any;

  public token = '';

  // @ts-ignore
  public token_expires: Date;




  constructor(private http: HttpClient, private router: Router) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  // @ts-ignore
  registerUser(userData: any): Observable<any>{
    return this.http.post('http://127.0.0.1:8000/accounts/register', userData, this.httpOptions);

  }

  public getUserList(): Observable<any>{
    return this.http.get('http://127.0.0.1:8000/accounts/users', this.httpOptions)
  }

  public getUser(){

    // @ts-ignore
    let user = JSON.parse(localStorage.getItem('auth_token'))
    if (!user){
      user = {user: '', token: '', email: ''}
    }
    return user
  }

  public login(user: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/accounts/login', JSON.stringify(user), this.httpOptions)
  }



  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate([''])
  }

  public isLogIn(){
    return localStorage.getItem('auth_token') !== null
  }


  public updateData(token:string) {
    this.token = token;
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
  }

}
