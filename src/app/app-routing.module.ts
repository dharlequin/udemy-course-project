import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list/shopping-list.component';

import { RecipesComponent } from './recipe-book/recipes/recipes.component';
import { RecipeDetailsComponent } from './recipe-book/recipe-details/recipe-details.component';
import { NoRecipeComponent } from './recipe-book/no-recipe/no-recipe.component';
import { EditRecipeComponent } from './recipe-book/edit-recipe/edit-recipe.component';

const routes: Routes = [
  {path: '', redirectTo: 'recipes', pathMatch: 'full'},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'recipes', component: RecipesComponent, children: [
    {path: '', component: NoRecipeComponent},
    {path: 'new', component: EditRecipeComponent},
    {path: ':id', component: RecipeDetailsComponent},
    {path: 'edit/:id', component: EditRecipeComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
