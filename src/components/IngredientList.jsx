

export default function IngredientsList(props) {
    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))
    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
            {props.ingredients.length > 3 && <div className="get-recipe-container">
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p className="recipe-box-area">Generate a recipe from your list of ingredients.</p>
                </div>
                <button
                    onClick={props.getRecipe}
                    disabled={props.loading}               // ← disable while loading
                    style={{ 
                        opacity: props.loading ? 0.6 : 1, 
                        cursor: props.loading ? 'wait' : 'pointer' 
                    }}
                    >{props.loading ? '⏳ Thinking…'  : 'Get a recipe'}
                 </button>
            </div>}
        </section>
    )
}