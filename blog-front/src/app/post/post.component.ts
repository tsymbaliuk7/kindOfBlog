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


  public isLikedPost(){
    return this.post.likes.indexOf(this.userService.getUser().id) !== -1
  }

  public isDislikedPost(){
    return this.post.dislikes.indexOf(this.userService.getUser().id) !== -1
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
    if (this.userService.isLogIn()){
      this.postService.dislikePost(this.post).subscribe(response => {
        this.post = response
      })
    }

  }

  likeClicked(){
    if (this.userService.isLogIn()){
       this.postService.likePost(this.post).subscribe(response => {
        this.post = response
      })
    }
  }

  getColor(){
    if(this.post.balance > 0) return 'green'
    else return this.post.balance == 0 ? '#fffffa': 'red'
  }

  deleteConfirmation(){
    if (confirm('Do you really want to delete \'' + this.post.title + '\'?')){
      this.postService.deletePost(this.post).subscribe(
          data => {
            this.app.getPosts(this.post.owner.id);
          },
          error => {

          }
      )
    }
  }

  declineUpdating(){
    this.post_updated = Object.assign({}, this.post)
    this.is_updating = false;

  }

}
