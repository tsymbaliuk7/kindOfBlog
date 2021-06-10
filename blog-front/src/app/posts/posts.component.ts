import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {PostsService} from "../posts.service";
import {UserService} from "../login/user.service";
import {ActivatedRoute, Router} from "@angular/router";

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
  public userProfile: any;

  public constructor(private title: Title, public postService: PostsService, public user: UserService,
                     private router: ActivatedRoute, private navigationRoute: Router) {

    this.userProfile = {}

    this.posts = []
      this.singlePost = {
        'title': '',
        'text': '',
        'balance': 0,
        'comments': [],
    }

  }


  public createPost(){
    this.postService.postsCreate(this.singlePost).subscribe(
        data => {
          this.singlePost.title = '';
          this.singlePost.text = '';
          this.getPosts(this.userProfile.id);
        },
        error => {
          this.create_error = error;
        }
    )
  }

  public getPosts(userId: any){

    this.postService.postsList(userId).subscribe(
        data => {
          this.posts = data
        },
        error => {

        }
    )
  }


  public getUserProfileData(userId: any){
      this.user.getProfile(userId).subscribe(response => {
          this.userProfile = response;
      }, error => {
          this.navigationRoute.navigate(['404'])
      })
  }


  ngOnInit(): void {
      this.title.setTitle('My posts');
      const routerParam = this.router.snapshot.paramMap;
      const userId = Number(routerParam.get('userId'));
      this.getUserProfileData(userId);
      this.getPosts(userId)
      console.log(this.user.getUser())
  }

}
