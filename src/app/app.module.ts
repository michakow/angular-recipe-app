import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UppercaseFirstLetterPipe } from './pipes/uppercase-first-letter.pipe';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { DetailsComponent } from './components/details/details.component';
import { RecipeTileComponent } from './components/recipe-tile/recipe-tile.component';
import { FooterComponent } from './components/footer/footer.component';
import { TransformRatingToIconsPipe } from './pipes/transform-rating-to-icons.pipe';
import { FormComponent } from './components/form/form.component';
import { AdminGuard } from './guards/admin.guard';
import { RecipRatingModalComponent } from './components/recip-rating-modal/recip-rating-modal.component';
import { LoginPanelComponent } from './components/login-panel/login-panel.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPanelComponent,
  },
  {
    path: 'recipes',
    component: MainComponent,
    children: [
      {
        path: 'form',
        component: FormComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'details',
        component: DetailsComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'recipes',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    UppercaseFirstLetterPipe,
    HeaderComponent,
    MainComponent,
    RecipeListComponent,
    DetailsComponent,
    RecipeTileComponent,
    FooterComponent,
    TransformRatingToIconsPipe,
    FormComponent,
    RecipRatingModalComponent,
    LoginPanelComponent,
  ],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
