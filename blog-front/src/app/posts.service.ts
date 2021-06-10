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

    if (userService.isLogIn()) {
      // @ts-ignore
      let userdata = JSON.parse(localStorage.getItem('auth_token'))
      if (userService.decodeToken(userdata.token) * 1000 < Date.now()){
        console.log('here')
        userService.refreshToken(userdata.refresh_token).subscribe(request => {
          localStorage.setItem('auth_token', JSON.stringify(request))
          // @ts-ignore
          userdata = JSON.parse(localStorage.getItem('auth_token'))
      })
      }
      this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + userdata.token
      })
    };
    }
    else {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }
    }

  }

  public postsList(ownerId: any): Observable<any>{
    return this.http.get('http://127.0.0.1:8000/posts/' + ownerId + '/', this.httpOptions)
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


  public likePost(post: any): Observable<any>{
    return this.http.put('http://127.0.0.1:8000/posts/like/' + post.id + '/', post, this.httpOptions)
  }


  public dislikePost(post: any): Observable<any>{
    return this.http.put('http://127.0.0.1:8000/posts/dislike/' + post.id + '/', post, this.httpOptions)
  }


}
