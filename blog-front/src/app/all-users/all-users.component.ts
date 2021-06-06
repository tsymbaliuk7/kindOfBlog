import { Component, OnInit } from '@angular/core';
import {UserService} from "../login/user.service";
import {htmlAstToRender3Ast} from "@angular/compiler/src/render3/r3_template_transform";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  public allUsers: any;

  constructor(public userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.getUserList().subscribe(response => {
      this.allUsers = response;
      console.log(this.allUsers)
    }, error => {})
  }

}
