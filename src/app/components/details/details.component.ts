import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipeApiService } from 'src/app/services/recipe-api.service';
import { RecipeDetailsService } from 'src/app/services/recipe-details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  recipeToShow!: Recipe;
  isHttpError: boolean = false;

  constructor(private recipeDetailsService: RecipeDetailsService, private recipeApiSerivce: RecipeApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.recipeApiSerivce
          .getRecipeByID(params['id'])
          .pipe(catchError((err: HttpErrorResponse) => of(err)))
          .subscribe((res) => {
            if (res instanceof HttpErrorResponse) this.isHttpError = true;
            else this.recipeToShow = res;
          });
      }
    });
    this.recipeDetailsService.selectedRecipe.subscribe((recipe) => (this.recipeToShow = recipe));
  }
}
