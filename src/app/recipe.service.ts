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
  /*HTTP Requests For Mock Data*/ /////////
  /////////////////////////////////////////
  // getRecipes(): Observable<Recipe[]> {
  //   return of(RECIPES);
  // }

  // getRecipeByID(id: number): Observable<Recipe> {
  //   return of(RECIPES[2]);
  // }

  // addRecipe(recipe: NewRecipe): Observable<Recipe> {
  //   return of(RECIPES[0]);
  // }

  // deleteRecipe(id: number): Observable<Recipe> {
  //   return of(RECIPES[0]);
  // }

  // updateRecipe(recipe: Recipe, id: number): void {}

  // favoriteRecipe(recipe: Recipe, id: number): void {}

  // searchByTitle(searchTerm: string): Observable<(Recipe | undefined)[]> {
  //   const recipes = RECIPES.filter((recipe) => {
  //     //check if recipe title includes the search term
  //     if (recipe.title.toLowerCase().includes(searchTerm)) {
  //       //if true, return the recipe
  //       return recipe;
  //     }
  //     //else, return nothing
  //     return false;
  //   });

  //   return of(recipes);
  // }

  // searchByTag(searchTerm: string): Observable<(Recipe | undefined)[]> {
  //   const recipes = RECIPES.filter((recipe) => {
  //     //check if recipe tags include the search term
  //     if (
  //       recipe.tags.some((tag) => {
  //         if (tag.toLowerCase().includes(searchTerm)) {
  //           return true;
  //         }
  //         return false;
  //       })
  //     ) {
  //       //if true, return the recipe
  //       return recipe;
  //     }
  //     //else, return nothing
  //     return false;
  //   });

  //   return of(recipes);
  // }

  // searchByIngredient(searchTerm: string): Observable<(Recipe | undefined)[]> {
  //   const recipes = RECIPES.filter((recipe) => {
  //     //check if recipe tags include the search term
  //     if (
  //       recipe.ingredients.some((ing) => {
  //         if (ing.toLowerCase().includes(searchTerm)) {
  //           return true;
  //         }
  //         return false;
  //       })
  //     ) {
  //       //if true, return the recipe
  //       return recipe;
  //     }
  //     //else, return nothing
  //     return false;
  //   });

  //   return of(recipes);
  // }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.configUrl}recipes`);
  }

  getRecipeByID(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.configUrl}recipe/${id}`);
  }

  addRecipe(recipe: NewRecipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.configUrl}add-recipe`, recipe);
  }

  deleteRecipe(id: number): Observable<Recipe> {
    return this.http.delete<Recipe>(`${this.configUrl}delete-recipe/${id}`);
  }

  updateRecipe(recipe: NewRecipe, id: number): Observable<ArrayBuffer> {
    return this.http.put<ArrayBuffer>(
      `${this.configUrl}update-recipe/${id}`,
      recipe
    );
  }

  favoriteRecipe(recipe: Recipe, id: number): Observable<ArrayBuffer> {
    //reverse the favorite before sending request
    recipe.favorite = !recipe.favorite;

    return this.http.put<ArrayBuffer>(
      `${this.configUrl}update-recipe/${id}`,
      recipe
    );
  }

  searchByTitle(searchTerm: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      `${this.configUrl}recipe/by-title/${searchTerm}`
    );
  }

  searchByTag(searchTerm: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      `${this.configUrl}recipe/by-tags/${searchTerm}`
    );
  }

  searchByIngredient(searchTerm: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      `${this.configUrl}recipe/by-ingredients/${searchTerm}`
    );
  }

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
