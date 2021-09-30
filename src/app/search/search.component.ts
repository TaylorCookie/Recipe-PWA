import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Recipe } from 'dist/recipe-app/assets/interfaces/recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchQuery = new FormControl('');
  recipes?: (Recipe | undefined)[];
  loadingCards: any[] = Array(12).fill(null);
  loading: boolean = false;
  searchClicked: boolean = false;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}

  submitSearch(event: any) {
    event.preventDefault();
    this.loading = true;
    this.searchClicked = true;

    this.recipeService
      .searchByCategoryOrRecipeNameOrIngredient(
        this.searchQuery.value.toLowerCase()
      )
      .subscribe((recipes: (Recipe | undefined)[]) => {
        setTimeout(() => {
          this.recipes = recipes;
          this.loading = false;
          console.log(this.recipes);
        }, 3000);
      });
  }
}
