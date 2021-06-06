import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserService} from "./login/user.service";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private httpOptions: any;

  constructor(private http: HttpClient, private userService: UserService) {
    // @ts-ignore
    const userdata = JSON.parse(localStorage.getItem('auth_token')).token
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + userdata
      })
    };
  }

  public postsList(): Observable<any>{
    console.log(localStorage.getItem('auth_token'))
    return this.http.get('http://127.0.0.1:8000/posts/', this.httpOptions)
  }

  public postsCreate(post: any): Observable<any>{
    return this.http.post('http://127.0.0.1:8000/posts/', post, this.httpOptions)
  }

  public postsUpdate(post: any): Observable<any>{
    return this.http.put('http://127.0.0.1:8000/posts/' + post.id + '/', post, this.httpOptions)
  }

  public deletePost(post: any): Observable<any>{
    return this.http.delete('http://127.0.0.1:8000/posts/' + post.id + '/', this.httpOptions)
  }

   // public postsDetail(post_id: any): Observable<any>{
   //   return this.http.get('http://127.0.0.1:8000/posts/' + post_id + '/', this.httpOptions)
   // }

}
