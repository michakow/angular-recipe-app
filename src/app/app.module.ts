import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UppercaseFirstLetterPipe } from './pipes/uppercase-first-letter.pipe';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { DetailsComponent } from './components/details/details.component';
import { RecipeTileComponent } from './components/recipe-tile/recipe-tile.component';
import { FooterComponent } from './components/footer/footer.component';
import { TransformRatingToIconsPipe } from './pipes/transform-rating-to-icons.pipe';

@NgModule({
  declarations: [AppComponent, UppercaseFirstLetterPipe, HeaderComponent, MainComponent, RecipeListComponent, DetailsComponent, RecipeTileComponent, FooterComponent, TransformRatingToIconsPipe],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
