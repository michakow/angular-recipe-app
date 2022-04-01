import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() appName!: string;
  logged: boolean = !!localStorage.getItem('logged');
  userName: string = this.logged ? JSON.parse(localStorage.getItem('userName')!) : '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  logOut() {
    this.logged = false;
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
