import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { catchError, debounceTime, delay, filter, fromEvent, map, of, tap } from 'rxjs';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipeApiService } from 'src/app/services/recipe-api.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, AfterViewInit {
  recipeList: Recipe[] = [];
  recipeListToShow: Recipe[] = [];
  filtersActive: boolean = false;
  input!: HTMLInputElement;
  isHttpError: boolean = false;

  constructor(private recipeApiService: RecipeApiService) {}

  ngOnInit(): void {
    this.recipeApiService
      .getRecipes()
      .pipe(
        delay(500),
        catchError((err: HttpErrorResponse) => of(err))
      )
      .subscribe((res) => {
        if (res instanceof HttpErrorResponse) this.isHttpError = true;
        else this.recipeList = res;
      });
  }

  ngAfterViewInit(): void {
    this.input = document.querySelector('input') as HTMLInputElement;
    this.input.placeholder = 'Szukaj przepisu (min 4 litery)';

    fromEvent(this.input, 'input')
      .pipe(
        debounceTime(500),
        map((event) => (event.target as HTMLInputElement).value),
        map((value) => value.trim()),
        map((value) => value.toLowerCase()),
        tap((value) => {
          this.filtersActive = false;
          this.input.value = this.input.value.trim();
        }),
        filter((value) => value.length > 3)
      )
      .subscribe((searchValue) => {
        this.filtersActive = true;
        this.recipeListToShow = this.recipeList.filter((recipe) => recipe.name.includes(searchValue));
      });
  }
}
