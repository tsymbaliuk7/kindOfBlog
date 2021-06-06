import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {PostsService} from "../posts.service";
import {UserService} from "../login/user.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  public posts: any;
  public singlePost: any;
  public create_error: any;
  public avatar = 'https://png.pngtree.com/element_our/20190528/ourlarge/pngtree-avatar-icon-image_1130894.jpg';

  public constructor(private title: Title, public postService: PostsService, public user: UserService) {
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
        }
    )
  }


  ngOnInit(): void {
    this.title.setTitle('My posts')

  }

}
