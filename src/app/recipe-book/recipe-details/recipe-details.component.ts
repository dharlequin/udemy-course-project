import { ShoppingListService } from './../../_services/shopping-list.service';
import { RecipesService } from './../../_services/recipes.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {

  public recipe: Recipe;
  public id: number;
  constructor(private recipesService: RecipesService,
    private slService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.id = +data['id'];
      this.recipe = this.recipesService.getRecipe(this.id);
    });
  }

  public addIngredientsToList(): void {
    this.slService.addIngredients(this.recipe.ingredients);
  }

  public deleteRecipe(): void {
    this.recipesService.deleteRecipe(this.id);
    this.router. navigate(['/recipes']);
  }

}
