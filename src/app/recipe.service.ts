import { Injectable } from '@angular/core';
import { Recipe } from 'src/assets/interfaces/recipe';
import { RECIPES } from 'src/assets/mock-recipes';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor() {}

  getRecipes(): Observable<Recipe[]> {
    const recipes = RECIPES;
    return of(recipes);
  }

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
}
