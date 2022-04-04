import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  canAddRecipe: boolean = false;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (this.userService.getRole() === 'author') this.canAddRecipe = true;
  }
}
