import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../_services/recipes.service';
import { ShoppingListService } from '../_services/shopping-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private recipeService: RecipesService,
    private slService: ShoppingListService) { }

  ngOnInit() {
  }

  public saveData() {
    this.recipeService.saveRecipes().subscribe(response => {
      console.log(response);
    });
    this.slService.saveIngredients().subscribe(response => {
      console.log(response);
    });
  }

  public fetchData() {
    this.recipeService.fetchRecipes();
    this.slService.fetchIngredients();
  }

  // public initDatabase(): void {
  //   this.recipeService.initRecipes().subscribe(response => {
  //     console.log(response);
  //   });
  //   this.slService.initIngredients().subscribe(response => {
  //     console.log(response);
  //   });
  // }

}
