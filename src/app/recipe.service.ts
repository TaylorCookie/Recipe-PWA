import { Injectable } from '@angular/core';
import { Recipe } from 'src/assets/interfaces/recipe';
import { NewRecipe } from 'src/assets/interfaces/newRecipe';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RECIPES } from 'src/assets/mock-recipes';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  configUrl = 'https://springboot-recipe-api.herokuapp.com/';
  errorMessage?: string;

  constructor(private http: HttpClient) {}

  /////////////////////////////////////////
  /*HTTP Requests*/ ////////////////////////
  /////////////////////////////////////////
  getRecipes(): Observable<Recipe[]> {
    return of(RECIPES);
  }

  getRecipeByID(id: number): Observable<Recipe> {
    return of(RECIPES[0]);
  }

  addRecipe(recipe: NewRecipe): Observable<Recipe> {
    return of(RECIPES[0]);
  }

  deleteRecipe(id: number): Observable<Recipe> {
    return of(RECIPES[0]);
  }

  updateRecipe(recipe: Recipe, id: number): void {}

  favoriteRecipe(recipe: Recipe, id: number): void {}

  // getRecipes(): Observable<Recipe[]> {
  //   return this.http.get<Recipe[]>(`${this.configUrl}recipes`);
  // }

  // getRecipeByID(id: number): Observable<Recipe> {
  //   return this.http.get<Recipe>(`${this.configUrl}recipe/${id}`);
  // }

  // addRecipe(recipe: NewRecipe): Observable<Recipe> {
  //   return this.http.post<Recipe>(`${this.configUrl}add-recipe`, recipe);
  // }

  // deleteRecipe(id: number): Observable<Recipe> {
  //   return this.http.delete<Recipe>(`${this.configUrl}delete-recipe/${id}`);
  // }

  // updateRecipe(recipe: Recipe, id: number): Observable<ArrayBuffer> {
  //   return this.http.put<ArrayBuffer>(
  //     `${this.configUrl}update-recipe/${id}`,
  //     recipe
  //   );
  // }

  // favoriteRecipe(recipe: Recipe, id: number): Observable<ArrayBuffer> {
  //   //reverse the favorite before sending request
  //   recipe.favorite = !recipe.favorite;

  //   return this.http.put<ArrayBuffer>(
  //     `${this.configUrl}update-recipe/${id}`,
  //     recipe
  //   );
  // }

  /////////////////////////////////////////
  /*Functions used by multiple components*/
  /////////////////////////////////////////
  convertTime(time: number | undefined): string {
    if (time === undefined) return '';

    const hours = Math.trunc(time / 60);
    const minutes = time % 60;

    if (hours == 0) {
      return `${minutes}min`;
    } else if (minutes == 0) {
      return `${hours}hr`;
    } else {
      return `${hours}:${minutes}`;
    }
  }

  getRandomBackgroundColor(): string {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 90%)`;
  }
}
