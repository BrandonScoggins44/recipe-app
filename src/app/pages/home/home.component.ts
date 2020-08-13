import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public recipeService: RecipeService) { }

  ngOnInit(): void {
  }

}
