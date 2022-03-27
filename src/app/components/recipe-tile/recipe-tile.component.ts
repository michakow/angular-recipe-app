import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipeDetailsService } from 'src/app/services/recipe-details.service';

@Component({
  selector: 'app-recipe-tile',
  templateUrl: './recipe-tile.component.html',
  styleUrls: ['./recipe-tile.component.scss']
})
export class RecipeTileComponent implements OnInit {
  @Input() recipe!: Recipe;

  constructor(private recipeDetailsService: RecipeDetailsService, private router: Router) { }

  ngOnInit(): void {
  }

  selectRecipe(recipe: Recipe){
    this.recipeDetailsService.selectedRecipe.next(recipe);
    this.router.navigate(['recipes','details']);
  }
}
