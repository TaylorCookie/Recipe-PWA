import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CardsComponent } from './cards/cards.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { AddRecipeFormComponent } from './add-recipe-form/add-recipe-form.component';
import { SkeletonLoadingCardsComponent } from './skeleton-loading-cards/skeleton-loading-cards.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeEditorComponent } from './recipe-editor/recipe-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    CardDetailsComponent,
    CardsComponent,
    NavbarComponent,
    LoadingIndicatorComponent,
    AddRecipeFormComponent,
    SkeletonLoadingCardsComponent,
    RecipeEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
