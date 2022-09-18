import { v4 as uuidv4 } from 'uuid';
import React, { useContext } from "react";
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import { RecipeContext } from "./App";
// import recipeingredientedit from "./RecipeIngredientEdit";
export default function RecipeEdit({ recipe }) {
  const { handleRecipeChange,handleRecipeSelect } = useContext(RecipeContext);

  function handleChange(changes) {
    handleRecipeChange(recipe.id, { ...recipe, ...changes });
  }

  function handleIngredientChange(id,ingredient){
    const newIngredients =[...recipe.ingredients]
    const index=newIngredients.findIndex(i=>i.id===id)
    newIngredients[index]= ingredient
    handleChange({ingredients: newIngredients}) 
  }
  function handleIngredientAdd(){
    const newIngredient={
      id: uuidv4(),
      name: '',
      amount: ''
    }
    handleChange({ingredients: [...recipe.ingredients,newIngredient]})
  }

  function handleIngredientDelete(id){
    handleChange({
      ingredients: recipe.ingredients.filter(i=>i.id!==id)
    })
  }


  return (
    <div className="recipe-edit">
      <div className="recipe-edit__remove-button-container">
        <button
        onClick={()=>handleRecipeSelect(undefined)}
         className="btn recipe-edit__remove-button">&times;</button>
      </div>

      <div className="recipe-edit__details-grid">
        <label className="recipe-edit__label" htmlFor="name">
          Name
        </label>
        <input
          className="recipe-edit__input"
          type="text"
          name="name"
          id="name"
          value={recipe.name}
          onInput={(e) => handleChange({ name: e.target.value })}
        />
        <label className="recipe-ed it__label" htmlFor="Cooktime">
          CookTime
        </label>
        <input
          className="recipe-edit__input"
          type="text"
          name="CookTime"
          id="CookTime"
          value={recipe.cookTime}
          onInput={(e) => handleChange({ cookTime: e.target.value })}
        />
        <label className="recipe-edit__label" htmlFor="Servings">
          Servings
        </label>
        <input
          min="1"
          className="recipe-edit__input"
          type="number"
          name="Servings"
          id="Servings"
          value={recipe.serving}
          onInput={(e) =>
            handleChange({ serving: parseInt(e.target.value) || "" })
          }
        />
        <label className="recipe-edit__label" htmlFor="instructions">
          Instructions
        </label>
        <textarea
          value={recipe.instructions}
          className="recipe-edit__input"
          name="instructions"
          id="instructions"
          onInput={(e) => handleChange({ instructions: e.target.value })}
        ></textarea>
      </div>
      <br />
      <label className="recipe-edit__label">Ingredients</label>
      <div className="recipe-edit__ingredient-grid">
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {recipe.ingredients.map((ingredient) => (
          <RecipeIngredientEdit
           key={ingredient.id}
          handleIngredientChange={handleIngredientChange}
          handleIngredientDelete={handleIngredientDelete}
          ingredient={ingredient} />
        ))}
        {/* {ingredient Components} */}
      </div>
      <div className="recipe-edit__add-ingredient-btn-container">
        <button className="btn btn--primary"
        onClick={()=>handleIngredientAdd()}
        >Add ingredient</button>
      </div>
    </div>
  );
}
