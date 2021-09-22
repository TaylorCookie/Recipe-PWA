import { Injectable } from '@angular/core';
import { Recipe } from 'src/assets/interfaces/recipe';
import { RECIPES } from 'src/assets/mock-recipes';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  configUrl = 'localhost:8080/';
  // headers = new HttpHeaders()
  //   .set('mode', 'no-cors')
  //   .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return of(RECIPES);

    // return this.http.get<Recipe[]>(`${this.configUrl}recipes`);
  }

  // getRecipes(): Observable<Recipe[]> {
  //   const recipes = RECIPES;
  //   return of(recipes);
  // }

  getRecipeByID(id: number): Observable<Recipe> {
    const recipe = RECIPES.find((r) => r.id === id)!;
    return of(recipe);
  }

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

  favoriteRecipe(id: number): void {
    //PLACEHOLDER FOR LATER HTTP PATCH REQUEST
    RECIPES.find((r) => r.id === id)!.favorite = !RECIPES.find(
      (r) => r.id === id
    )!.favorite;
  }
}
