import { Component, OnInit , Input} from '@angular/core';
import {PostsService} from "../posts.service";
import {AppComponent} from "../app.component";
import {PostsComponent} from "../posts/posts.component";
import {UserService} from "../login/user.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [PostsService]
})
export class PostComponent implements OnInit {

  @Input() post: any;

  post_updated: any;

  updating_errors: any;
  is_updating;

  constructor(public postService: PostsService, public app: PostsComponent, public userService: UserService) {
    this.is_updating = false;


  }

  ngOnInit(): void {
    this.post_updated = Object.assign({}, this.post)

  }

  public changeToUpdating(){
    this.is_updating = true;

  }

  updatePost(){
      this.postService.postsUpdate(this.post_updated).subscribe(
          data => {
            this.is_updating = false;
            this.post = Object.assign({}, this.post_updated)

          },
          error => {
            this.updating_errors = error
          }
      );
  }

  dislikeClicked(){
    if (this.post.is_liked){
      this.post.balance -= 2
    }
    else {
      if (this.post.is_disliked){
        this.post.balance += 1
      }
      else {
        this.post.balance -= 1
      }
    }
    this.post.is_disliked = !this.post.is_disliked;
    this.post.is_liked = false;
    this.postService.postsUpdate(this.post).subscribe(
          data => {
            this.post.title = data.title
            this.post.text = data.text
          },
          error => {
            console.log(error)
            this.updating_errors = error
          }
      );

  }

  likeClicked(){
    if (this.post.is_disliked){
      this.post.balance += 2
    }
    else {
      if (this.post.is_liked){
        this.post.balance -= 1
      }
      else {
        this.post.balance += 1
      }
    }
    this.post.is_disliked = false;
    this.post.is_liked = !this.post.is_liked;
    this.postService.postsUpdate(this.post).subscribe(
          data => {
            this.post.title = data.title
            this.post.text = data.text
          },
          error => {
            console.log(error)
            this.updating_errors = error
          }
      );
  }

  getColor(){
    if(this.post.balance > 0) return 'green'
    else return this.post.balance == 0 ? '#fffffa': 'red'
  }

  deleteConfirmation(){
    if (confirm('Do you really want to delete \'' + this.post.title + '\'?')){
      this.postService.deletePost(this.post).subscribe(
          data => {
            this.app.getPosts();
          },
          error => {

          }
      )
    }
  }

  declineUpdating(){
    console.log(this.post)
    console.log(this.post_updated)
    this.post_updated = Object.assign({}, this.post)
    console.log(this.post)
    console.log(this.post_updated)
    this.is_updating = false;

  }

}
