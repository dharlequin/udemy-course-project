import { ShoppingListService } from './../../_services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  private ingredientsSubscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsSubscription = this.shoppingListService.ingredientsEmitter.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    });
  }

  public addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  selectIngredient(index: number) {
    this.shoppingListService.editting.next(index);
  }

  ngOnDestroy() {
    this.ingredientsSubscription.unsubscribe();
  }
}
