import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddRecipeFormComponent } from './add-recipe-form/add-recipe-form.component';
import { CardsComponent } from './cards/cards.component';
import { SkeletonLoadingCardsComponent } from './skeleton-loading-cards/skeleton-loading-cards.component';
import { RecipeEditorComponent } from './recipe-editor/recipe-editor.component';

const routes: Routes = [
  { path: 'add-recipe', component: AddRecipeFormComponent },
  { path: 'test', component: SkeletonLoadingCardsComponent },
  { path: 'recipe/:id', component: RecipeEditorComponent },
  { path: '', component: CardsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
