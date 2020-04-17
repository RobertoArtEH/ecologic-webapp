import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  user: User;
  members;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.userService.getUsers().subscribe(response => {
      this.members = response;
    });
  }

  switchStatus(id: number, status: number) {
    this.userService.switchStatus({ id, status }).subscribe(response => {
      const index = this.members.findIndex(member => member.id == response.id);
      
      this.members[index] = response;
    })
  }

}
