import { Injectable } from '@angular/core';

import { IIngredient } from "./../interfaces/ingredient";
import { Recipe } from "./../classes/recipe";
import * as RecipeData from "../../data.json";
import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [];

  constructor() {
    (<any>RecipeData).recipes.forEach(recipe => {
      this.recipes.push(new Recipe(recipe))
    });
  }

  public getRecipes(): Recipe[] {
    return this.recipes;
  }

  public getRecipeById(id: number): Recipe {
    return _.find(this.recipes, (recipe) => recipe.id === id);
  }

  public createRecipe(title: string, description: string, serves: string, imageUrl: string, ingredients: IIngredient[], instructions: string[]) {

    const newRecipeData = {
      id: this.getNextId(),
      title,
      description,
      serves,
      imageUrl,
      ingredients,    // ingredients: [...ingredients]
      instructions    // instructions: [...instructions]
    }

    const newRecipe = new Recipe(newRecipeData);

    this.recipes.push(newRecipe);
    return newRecipe;
  }

  private getNextId(): number {
    const max = _.maxBy( this.recipes, (recipe) => recipe.id);
    return max.id + 1;
  }

  public updateRecipe(recipe: Recipe): Recipe {
    const recipeIndex = _.findIndex(this.recipes, (r) => r.id === recipe.id);
    
    this.recipes[recipeIndex] = recipe;
    return recipe;
  }

  public deleteRecipe(id: number): void {
    const recipeIndex = _.findIndex(this.recipes, (r) => r.id === id);

    if (recipeIndex !== -1) {
      this.recipes.splice(recipeIndex, 1);
    }
  }
}
