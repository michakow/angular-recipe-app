import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeApiService {
  constructor(private http: HttpClient) {}

  getRecipes() {
    return this.http.get<Recipe[]>('http://localhost:3000/recipes');
  }

  getRecipeByID(id: number) {
    return this.http.get<Recipe>(`http://localhost:3000/recipes/${id}`);
  }

  getRecipesWithName(name: string){
    return this.http.get<Recipe[]>(`http://localhost:3000/recipes?name_like=${name}`);
  }

  addRecipe(recipe: Recipe){
    return this.http.post<Recipe>('http://localhost:3000/recipes', {...recipe});
  }
}
