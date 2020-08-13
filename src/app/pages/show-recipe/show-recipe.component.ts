import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/classes/recipe';

@Component({
  selector: 'app-show-recipe',
  templateUrl: './show-recipe.component.html',
  styleUrls: ['./show-recipe.component.scss']
})
export class ShowRecipeComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = []
  public recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.route.paramMap.subscribe(params => {
      const recipeId = params.get('id');
      this.recipe = this.recipeService.getRecipeById(parseInt(recipeId));
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  back() {
    this.location.back();
  }

  deleteRecipe(): void {
    this.recipeService.deleteRecipe(this.recipe.id)
    this.router.navigate([''])
  }
}
