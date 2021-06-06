import { Component, OnInit } from '@angular/core';
import {UserService} from "../login/user.service";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

   public input: any;

  public errors: any;

  constructor(public userService: UserService, public title: Title, private router: Router) {
    title.setTitle('Register')
  }

  ngOnInit() {
    this.input = {
      username: '',
      email: '',
      password: '',
    }
    this.errors = {
      email: [],
      password: [],
      username: [],
      error: []
    }

  }

  toRegister(){
    this.userService.registerUser(this.input).subscribe(
        response => {
          this.errors = {
            email: [],
            password: [],
            username: [],
            error: []
          }
          this.userService.updateData(response.user.token)
          localStorage.setItem('auth_token', JSON.stringify(response.user))
          this.router.navigate(['']);
        },
        error => {
         this.errors = {
            email: error.error.user.email ? error.error.user.email : [],
            password: error.error.user.password ? error.error.user.password : [],
            username: error.error.user.username ? error.error.user.username : [],
            error: error.error.user.error ? error.error.user.error : [],
          }
        }
    );
  }



}
