import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpOptions: any;

  public token = '';

  // @ts-ignore
  public token_expires: Date;

  public username = ''

  // сообщения об ошибках авторизации
  public errors: any = [];

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  // @ts-ignore
  registerUser(userData: any): Observable<any>{
    return this.http.post('http://127.0.0.1:8000/accounts/register', userData);

  }

  public login(user: any) {
    this.http.post('http://127.0.0.1:8000/auth/', JSON.stringify(user), this.httpOptions).subscribe(
      data => {
          // @ts-ignore
        this.updateData(data['token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  // обновление JWT токена
  public refreshToken() {
    this.http.post('http://127.0.0.1:8000/auth-refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
      data => {
        // @ts-ignore
          this.updateData(data['token']);
      },
      err => {
        this.errors = err['error'];
      }
    );
  }

  public logout() {
      // @ts-ignore
      this.token = null;
      // @ts-ignore
      this.token_expires = null;
      // @ts-ignore
      this.username = null;
  }

  private updateData(token:string) {
    this.token = token;
    this.errors = [];

    // декодирование токена для получения логина и времени жизни токена
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }

}
