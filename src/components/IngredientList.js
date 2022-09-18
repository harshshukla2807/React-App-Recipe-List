import React from 'react'
import Ingredient from './Ingredient'

export default function ingredientList({ingredients}) {
    // console.log(ingredients)
    const ingredientElements = ingredients.map((ingredient)=>{
        return <Ingredient key={ingredient.id} {...ingredient} />
    })
  return (
    <div className='ingredients-grid'>
        {ingredientElements}
    </div>
  )
}
