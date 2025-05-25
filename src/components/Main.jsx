import React from "react"
import IngredientList from './IngredientList'
import FloydRecipe from "./FloydRecipe"
import { getRecipeFromChefClaude } from '../data/ai'

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const [loading, setLoading]   = React.useState(false)

    async function getRecipe() {
        setLoading(true)
        try {
            const recipeMarkdown = await getRecipeFromChefClaude(ingredients)
            setRecipe(recipeMarkdown)
            } catch (err) {
            console.error(err)
            } finally {
            setLoading(false)                           
        }
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main>
            <h3>What's for dinner tonight!</h3>
            <p> Add the ingredients you have on hand to see what Chef Floyd can whip up tonight</p>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    loading={loading}
                />
            }

            {recipe && <FloydRecipe recipe={recipe} />}
        </main>
    )
}