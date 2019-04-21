import { Injectable } from '@angular/core';
import { Recipe } from '../recipe-book/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor() { }

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Burger',
      'Large sized burger served with fries',
      'https://sifu.unileversolutions.com/image/en-AU/recipe-topvisual/2/1260-709/beef-burger-with-deep-fried-bacon-and-thousand-island-dressing-50247463.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Bread', 1),
        new Ingredient('Fries', 20)
      ]
      ),
    new Recipe(
      'Hot Dog',
      'French hot dog served with salad',
      'https://media.daysoftheyear.com/20171223110023/hot-dog-day2.jpg',
      [
        new Ingredient('Sausage', 1),
        new Ingredient('Bread', 1),
        new Ingredient('Salad', 1)
      ]
      )
  ];

  recipesEmitter = new Subject<Recipe[]>();

  public getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  public getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  public updateRecipe(index: number, recipe: Recipe): void {
    this.recipes[index] = recipe;
    this.updateList();
  }

  public createNewRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.updateList();
  }

  public deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.updateList();
  }

  private updateList() {
    console.log(this.recipes);
    this.recipesEmitter.next(this.recipes.slice());
  }
}
