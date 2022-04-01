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
}
