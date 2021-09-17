import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddRecipeFormComponent } from './add-recipe-form/add-recipe-form.component';
import { CardsComponent } from './cards/cards.component';

const routes: Routes = [
  { path: 'add-recipe', component: AddRecipeFormComponent },
  { path: '', component: CardsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
