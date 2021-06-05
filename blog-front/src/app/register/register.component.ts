import { Component, OnInit } from '@angular/core';
import {UserService} from "../login/login/user.service";
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
    title.setTitle('Login')
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
    }

  }

  toRegister(){
    this.userService.registerUser(this.input).subscribe(
        response => {
          this.errors = {
            email: [],
            password: [],
            username: [],
          }
          console.log(response)
        },
        error => {
          this.errors = {
            email: error.error.email ? error.error.email : [],
            password: error.error.password ? error.error.password : [],
            username: error.error.username ? error.error.username : [],
          }
        }
    );
  }

  refreshToken() {
    this.userService.refreshToken();
  }

  toLogout() {
    this.userService.logout();
  }

}
