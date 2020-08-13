import { NgModule } from '@angular/core'
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { NewRecipeComponent } from "./pages/new-recipe/new-recipe.component";
import { EditRecipeComponent } from "./pages/edit-recipe/edit-recipe.component";
import { ShowRecipeComponent } from "./pages/show-recipe/show-recipe.component";

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'recipes', component: HomeComponent },
    { path: 'recipes/new', component: NewRecipeComponent },
    { path: 'recipes/edit/:id', component: EditRecipeComponent },
    { path: 'recipes/:id', component: ShowRecipeComponent },
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }