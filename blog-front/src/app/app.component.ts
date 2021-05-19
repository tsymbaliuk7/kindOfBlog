import {Component, OnInit} from '@angular/core';
import {UserService} from "./login/login/user.service";
import {Title} from "@angular/platform-browser";
import {PostsService} from "./posts.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PostsService]
})
export class AppComponent implements OnInit{

  public posts: any;
  public singlePost: any;
  public create_error: any;
  public avatar = 'https://png.pngtree.com/element_our/20190528/ourlarge/pngtree-avatar-icon-image_1130894.jpg';

  public constructor(private title: Title, public postService: PostsService) {
    this.singlePost = {
      'title': '',
      'text': '',
      'balance': 0,
      'comments': []
    }
    this.getPosts()
  }


  public createPost(){
    this.postService.postsCreate(this.singlePost).subscribe(
        data => {
          this.singlePost.title = '';
          this.singlePost.text = '';
          this.getPosts();
        },
        error => {
          console.log(error)
          this.create_error = error;
        }
    )
  }

  public getPosts(){
    this.postService.postsList().subscribe(
        data => {
          this.posts = data
        },
        error => {
          console.log(error)
        }
    )
  }


  ngOnInit(): void {
    this.title.setTitle('My posts')

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
