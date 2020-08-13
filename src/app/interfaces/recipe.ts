import { IIngredient } from './ingredient'

export interface IRecipe {
    id: number;
    title: string;
    description: string;
    serves: string;
    imageUrl: string;
    ingredients: IIngredient[];         // or Array<IIngredient>
    instructions: string[];
}
