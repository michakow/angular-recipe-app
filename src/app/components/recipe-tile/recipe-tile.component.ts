import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/interfaces/recipe';

@Component({
  selector: 'app-recipe-tile',
  templateUrl: './recipe-tile.component.html',
  styleUrls: ['./recipe-tile.component.scss']
})
export class RecipeTileComponent implements OnInit {
  @Input() recipe!: Recipe;
  constructor() { }

  ngOnInit(): void {
  }

  selectRecipe(recipe: Recipe){
    console.log(recipe);
  }
}
