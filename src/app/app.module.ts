import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpErrorInterceptor } from './http-error-interceptor.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CardsComponent } from './cards/cards.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddRecipeFormComponent } from './add-recipe-form/add-recipe-form.component';
import { SkeletonLoadingCardsComponent } from './skeleton-loading-cards/skeleton-loading-cards.component';
import { RecipeEditorComponent } from './recipe-editor/recipe-editor.component';
import { HerokuWarningCardComponent } from './heroku-warning-card/heroku-warning-card.component';
import { DisplayRecipeComponent } from './display-recipe/display-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    CardDetailsComponent,
    CardsComponent,
    NavbarComponent,
    AddRecipeFormComponent,
    SkeletonLoadingCardsComponent,
    RecipeEditorComponent,
    HerokuWarningCardComponent,
    DisplayRecipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
