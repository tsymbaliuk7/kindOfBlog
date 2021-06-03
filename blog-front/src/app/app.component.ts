import {Component, OnInit} from '@angular/core';
import {UserService} from "./login/login/user.service";
import {Title} from "@angular/platform-browser";
import {PostsService} from "./posts.service";
import {AppRoutingModule} from "./app-routing.module";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [PostsService]
})
export class AppComponent implements OnInit{

  public constructor() {

  }


  ngOnInit(): void {

  }

  // retrieveSingle(id: number){
  //     this.postService.postsDetail(id).subscribe(
  //       data => {
  //         this.posts = data
  //       },
  //       error => {
  //         console.log(error)
  //       }
  //   )
  // }


}
