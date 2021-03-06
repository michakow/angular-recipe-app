import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../interfaces/recipe';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeApiService {
  constructor(private http: HttpClient, private userService: UserService) {}

  getRecipes() {
    if (this.userService.getRole() === 'user') return this.http.get<Recipe[]>('http://localhost:3000/recipes');
    return this.http.get<Recipe[]>(`http://localhost:3000/recipes?author=${this.userService.getName()}`);
  }

  getRecipeByID(id: number) {
    return this.http.get<Recipe>(`http://localhost:3000/recipes/${id}`);
  }

  getRecipesWithName(name: string) {
    return this.http.get<Recipe[]>(`http://localhost:3000/recipes?name_like=${name}&author=${this.userService.getName()}`);
  }

  addRecipe(recipe: Recipe) {
    return this.http.post<Recipe>('http://localhost:3000/recipes', { ...recipe });
  }
}
