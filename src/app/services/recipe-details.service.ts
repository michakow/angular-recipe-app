import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeDetailsService {
  selectedRecipe = new ReplaySubject<Recipe>(1);

  constructor() { }
}
