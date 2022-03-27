import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipeDetailsService } from 'src/app/services/recipe-details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  recipeToShow!: Recipe;

  constructor(private recipeDetailsService: RecipeDetailsService) { }

  ngOnInit(): void {
    this.recipeDetailsService.selectedRecipe.subscribe(recipe => this.recipeToShow = recipe)
  }

}
