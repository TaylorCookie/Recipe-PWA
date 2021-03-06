import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Recipe } from 'src/assets/interfaces/recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchQuery = new FormControl('');

  recipesByTitle?: (Recipe | undefined)[];
  recipesByTag?: (Recipe | undefined)[];
  recipesByIngredient?: (Recipe | undefined)[];

  loadingCards: any[] = Array(12).fill(null);

  loadingByTitle: boolean = false;
  loadingByTag: boolean = false;
  loadingByIngredient: boolean = false;

  searchClicked: boolean = false;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}

  submitSearch(event: any) {
    event.preventDefault();

    //guard clause against searching by nothing
    if (!this.searchQuery.value.trim()) {
      return;
    }

    this.loadingByTitle = true;
    this.loadingByTag = true;
    this.loadingByIngredient = true;
    this.searchClicked = true;

    this.getRecipes();
  }

  getRecipes() {
    this.recipeService
      .searchByTitle(this.searchQuery.value.toLowerCase().trim())
      .subscribe((recipes: (Recipe | undefined)[]) => {
        this.recipesByTitle = recipes;
        this.loadingByTitle = false;
      });

    this.recipeService
      .searchByTag(this.searchQuery.value.toLowerCase().trim())
      .subscribe((recipes: (Recipe | undefined)[]) => {
        this.recipesByTag = recipes;
        this.loadingByTag = false;
      });

    this.recipeService
      .searchByIngredient(this.searchQuery.value.toLowerCase().trim())
      .subscribe((recipes: (Recipe | undefined)[]) => {
        this.recipesByIngredient = recipes;
        this.loadingByIngredient = false;
      });
  }

  btnRowClickHandler(event: any) {
    //guard clause against clicks that are not on buttons
    if (!event.target.classList.contains('btn')) return;

    const btns = document.querySelectorAll('.selector_btns');

    btns.forEach((btn) => {
      btn.classList.remove('btn_active');

      if (btn === event.target) {
        btn.classList.add('btn_active');
      }
    });

    //depending on dataset, set active clicked
    switch (event.target.dataset.name) {
      case 'title_btn': {
        this.displayContainer(
          document.querySelector<HTMLElement>('.results_by_title_container')
        );

        break;
      }

      case 'tag_btn': {
        this.displayContainer(
          document.querySelector<HTMLElement>('.results_by_tags_container')
        );

        break;
      }

      case 'ingredient_btn': {
        this.displayContainer(
          document.querySelector<HTMLElement>(
            '.results_by_ingredients_container'
          )
        );

        break;
      }

      default: {
        console.log('The delegated event handler is broken');
        break;
      }
    }
  }

  displayContainer(element: HTMLElement | null) {
    //guard clause
    if (!element) {
      return;
    }

    const containers =
      document.querySelectorAll<HTMLElement>('.result_container');

    containers.forEach((el) => {
      el.classList.add('hidden');
    });

    element.classList.remove('hidden');
  }
}
