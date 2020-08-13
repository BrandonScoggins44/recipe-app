import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from "./app-routing.module";
import { ReactiveFormsModule } from '@angular/forms'


// Services
import { RecipeService } from "./services/recipe.service";

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { EditRecipeComponent } from './pages/edit-recipe/edit-recipe.component';
import { NewRecipeComponent } from './pages/new-recipe/new-recipe.component';
import { ShowRecipeComponent } from './pages/show-recipe/show-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    EditRecipeComponent,
    NewRecipeComponent,
    ShowRecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    RecipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
