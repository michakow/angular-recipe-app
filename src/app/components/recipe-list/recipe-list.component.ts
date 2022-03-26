import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipeApiService } from 'src/app/services/recipe-api.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipeList: Recipe[] = []

  constructor(private recipeApiService: RecipeApiService) { }

  ngOnInit(): void {
    this.recipeApiService.getRecipes().subscribe(res => this.recipeList = res)
  }
}
