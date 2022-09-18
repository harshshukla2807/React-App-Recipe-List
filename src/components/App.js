import React,{useEffect, useState} from "react";
import RecipeList from "./RecipeList";
import "../css/app.css"
import { v4 as uuidv4 } from 'uuid';
import RecipeEdit from "./RecipeEdit";

 export const RecipeContext=React.createContext()
 const LOCAL_STORAGE_KEY='cookingWithReact.recipes'
 
 const SampleRecipes=[
   {
       id: 1,
       name: 'Plain Chicken',
       serving: 3,
       cookTime: '1:45',
       instructions: "1.Put salt on chicken \n2. Put chicken in over\n3. Eat chicken",
       ingredients:[
         {id : 1,
          name:' Chicken',
           amount: '2 pounds'
       },
         {id : 2,
          name:'salt',
           amount: '1 tbs'
       }
       ]
   },
   {
       id: 2,
       name: 'Plain Pork',
       serving: 5,
       cookTime: '0:45',
       instructions: "1.Put paprika on pork \n2. Put pork in over\n3. Eat pork",
       ingredients:[
         {id : 1,
          name:' Pork',
         amount: '2 pounds'
       },
         {id : 2,
          name:'Paprika',
         amount: '2 Tbs'
       }]
   }
   ]
 
function App() {
  const [selectedRecipeId,setSelectedRecipeId]=useState()
  const [recipes,setRecipes]=useState(SampleRecipes)
  const selectedRecipe= recipes.find(recipe=>recipe.id===selectedRecipeId)
  // console.log(selectedRecipe)
  
  useEffect(()=>{
    const recipeJSON=localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON!=null) setRecipes(JSON.parse(recipeJSON))
  },[])
  // empty brackets mean if you want to hook this useEffect only when the application loads
  
  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(recipes))
  },[recipes])
  
  const recipeContextValue={
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }
  
  function handleRecipeSelect(id){
    setSelectedRecipeId(id)
  }
    
  function handleRecipeChange(id , recipe){
    const newRecipes =[...recipes]
    const index=newRecipes.findIndex(r=>r.id===id)
    newRecipes[index]=recipe
    setRecipes(newRecipes)
  }
  
  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes}/>
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>}
    </RecipeContext.Provider>
  )
  
  
  function handleRecipeAdd(){
    const newRecipe={
      id: uuidv4(),
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients:[
        {id: uuidv4(),name: '',amount: '' }
        ]
      }
    setSelectedRecipeId(newRecipe.id)
      setRecipes([...recipes,newRecipe])
  }
  
  
  
  
  function handleRecipeDelete(id){
    if(selectedRecipeId!=null && selectedRecipe===id){
      setSelectedRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe=> recipe.id!==id))
  }
  
}

export default App;
