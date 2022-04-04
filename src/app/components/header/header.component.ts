import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() appName!: string;
  logged!: boolean;
  userName!: string;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.logged = this.userService.isLogged();
    this.userName = this.userService.getName();
  }

  logOut() {
    localStorage.clear();
    window.location.reload();
  }
}
