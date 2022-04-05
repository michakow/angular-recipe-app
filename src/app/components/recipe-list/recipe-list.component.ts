import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, delay, filter, fromEvent, map, of, tap } from 'rxjs';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipeApiService } from 'src/app/services/recipe-api.service';

export interface SortOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, AfterViewInit {
  recipeList: Recipe[] = [];
  input!: HTMLInputElement;
  isHttpError: boolean = false;
  noResult: boolean = false;

  sortControl = new FormControl('');
  selectedSortOption: SortOption = {
    value: '',
    label: '',
  };
  sortOptions: SortOption[] = [
    {
      value: 'name,asc',
      label: 'sortuj a-z',
    },
    {
      value: 'name,desc',
      label: 'sortuj z-a',
    },
    {
      value: 'rating,desc',
      label: 'sortuj oceny malejeco',
    },
    {
      value: 'rating,asc',
      label: 'sortuj oceny rosnaco',
    },
  ];

  constructor(private recipeApiService: RecipeApiService) {}

  ngOnInit(): void {
    this.recipeApiService
      .getRecipes(this.selectedSortOption)
      .pipe(
        delay(500),
        catchError((err: HttpErrorResponse) => of(err))
      )
      .subscribe((res) => {
        if (res instanceof HttpErrorResponse) this.isHttpError = true;
        else this.recipeList = res;
      });

    this.sortControl.valueChanges.pipe(map((value: string) => value.split(','))).subscribe(([label, value]) => {
      this.selectedSortOption = { label, value };
      console.log(this.selectedSortOption);
      console.log(this.sortControl.value);
      this.recipeApiService
        .getRecipes(this.selectedSortOption)
        .pipe(catchError((err: HttpErrorResponse) => of(err)))
        .subscribe((res) => {
          if (res instanceof HttpErrorResponse) this.isHttpError = true;
          else this.recipeList = res;
        });
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
          if (value.length > 3) {
            this.recipeList = [];
            this.noResult = false;
          }
          this.input.value = this.input.value.trim();
          if (value.length === 0) {
            this.recipeList = [];
            this.noResult = false;
            this.recipeApiService
              .getRecipes(this.selectedSortOption)
              .pipe(
                delay(300),
                catchError((err: HttpErrorResponse) => of(err))
              )
              .subscribe((res) => {
                if (res instanceof HttpErrorResponse) this.isHttpError = true;
                else {
                  this.recipeList = res;
                  if (res.length === 0) this.noResult = true;
                }
              });
          }
        }),
        filter((value) => value.length > 3)
      )
      .subscribe((searchValue) => {
        this.recipeApiService
          .getRecipesWithName(searchValue, this.selectedSortOption)
          .pipe(
            delay(300),
            catchError((err: HttpErrorResponse) => of(err))
          )
          .subscribe((res) => {
            if (res instanceof HttpErrorResponse) this.isHttpError = true;
            else {
              this.recipeList = res;
              if (res.length === 0) this.noResult = true;
            }
          });
      });
  }
}
