import { RecipesService } from './../../_services/recipes.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  recipeSubscription: Subscription;

  constructor(private recipeService: RecipesService) { }

  ngOnInit() {
    this.recipeService.fetchRecipes().subscribe();
    this.recipeSubscription = this.recipeService.recipesEmitter.subscribe(recipes => {
      console.log(recipes);
      this.recipes = recipes;
    });
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }
}
