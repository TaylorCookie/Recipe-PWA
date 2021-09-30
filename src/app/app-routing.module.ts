import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddRecipeFormComponent } from './add-recipe-form/add-recipe-form.component';
import { CardsComponent } from './cards/cards.component';
import { RecipeEditorComponent } from './recipe-editor/recipe-editor.component';
import { DisplayRecipeComponent } from './display-recipe/display-recipe.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'add-recipe', component: AddRecipeFormComponent },
  { path: 'search', component: SearchComponent },
  { path: 'recipe/:id', component: DisplayRecipeComponent },
  { path: 'recipe-edit/:id', component: RecipeEditorComponent },
  { path: '', component: CardsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
