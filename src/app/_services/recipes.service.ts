import { Injectable } from '@angular/core';
import { Recipe } from '../recipe-book/recipe.model';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  constructor(private http: HttpClient) {}

  private recipes: Recipe[] = [];

  recipesEmitter = new Subject<Recipe[]>();

  public saveRecipes() {
    return this.http.put(
      'https://udemy-http-project-3f72d.firebaseio.com/recipes.json',
      this.recipes
    );
  }

  public fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://udemy-http-project-3f72d.firebaseio.com/recipes.json'
      ).pipe(tap(recipes => {
        this.recipes = recipes;
        this.updateList();
      }));
  }

  public getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  public getRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(
      'https://udemy-http-project-3f72d.firebaseio.com/recipes/' + id + '.json'
    );
    // return this.recipes[id];
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
