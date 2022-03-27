import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeDetailsService {
  selectedRecipe = new Subject<Recipe>();

  constructor() { }
}
