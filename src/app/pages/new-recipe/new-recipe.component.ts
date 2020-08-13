import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/classes/recipe';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public recipe: Recipe;
  private instructions: FormArray;
  private ingredients: FormArray;
  public recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private location: Location,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        const recipeId = params.get('id');
        this.recipe = this.recipeService.getRecipeById(parseInt(recipeId))
        this.createForm();
      })
    )
  }

  private createForm(): void {
    this.recipeForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      serves: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      instructions: this.fb.array([]),
      ingredients: this.fb.array([])
    });

    this.instructions = this.recipeForm.get('instructions') as FormArray;
    this.ingredients = <FormArray>this.recipeForm.get('ingredients');

    this.addInstruction();
    this.addIngredient();
  }

  private createInstruction(step: string): FormGroup {
    return this.fb.group({
      step: [step, [Validators.required]]
    })
  }

  private createIngredient(amount: string, name: string): FormGroup {
    return this.fb.group({
      amount: [amount, [Validators.required]],
      name: [name, [Validators.required]]
    })
  }

  addIngredient(): void {
    this.ingredients.push(this.createIngredient('', ''));
  }

  deleteIngredient(index: number): void {
    const arrayControl = this.recipeForm.controls['ingredients'] as FormArray
    arrayControl.removeAt(index)
  }

  addInstruction(): void {
    this.instructions.push(this.createInstruction(''));
  }

  deleteInstruction(index: number): void {
    const arrayControl = this.recipeForm.controls['instructions'] as FormArray
    arrayControl.removeAt(index)
  }

  submitForm(): void {
    if (this.recipeForm.valid) {
      const { title, description, serves, imageUrl, ingredients, instructions } = this.recipeForm.value;
      const filteredInstructions = instructions.map(item => item.step);
      const newRecipe = this.recipeService.createRecipe(
        title,
        description,
        serves,
        imageUrl,
        ingredients,
        filteredInstructions
      )

      this.router.navigate([`/recipes/${newRecipe.id}`])
      // this.router.navigate([''])
    } else {
      // else show an alert
      alert("Form Error")
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  back() {
    this.location.back();
  }
}
