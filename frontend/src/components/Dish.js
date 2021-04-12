import '../App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
 
const Dish = () => {
    const [state, setState] = useState(false);
    const [deleteState, setDeleteState] = useState(false);
    const [advanceSearchState, setAdvancedSearchState] = useState(false);
    const [dishList, setDishList] = useState([]);
    const [dishId, setDishId] = useState("");
    const [dishName, setDishName] = useState("");
    const [dishDescription, setDishDescription] = useState("");
    const [dishRecipe, setDishRecipe] = useState("");
    const [dishIngredientList, setDishIngredientList] = useState([]);
    const [dishNutrientList, setDishNutrientList] = useState([]);
    const [dishCategoryList, setDishCategoryList] = useState([]);

    const [savedDish, setSavedDish] = useState({});
    const [savedDishIngredients, setSavedDishIngredients] = useState([]);
    const [savedDishNutrients, setSavedDishNutrients] = useState([]);
    const [savedDishCategories, setSavedDishCategories] = useState([]);

    const [ingredientSearchList, setIngredientSearchList] = useState("");
    const [categorySearchList, setCategorySearchList] = useState([]);
    const getDish = (dishId) => {
        Axios.get(`http://localhost:3002/api/get/dish/${dishId}`).then((response) => {
          setDishList(response.data)
        })
        Axios.get(`http://localhost:3002/api/get/dishIngredients/${dishId}`).then((response) => {
          setDishIngredientList(response.data)
        })
        Axios.get(`http://localhost:3002/api/get/dishNutrients/${dishId}`).then((response) => {
          setDishNutrientList(response.data)
        })
        Axios.get(`http://localhost:3002/api/get/dishCategory/${dishId}`).then((response) => {
          setDishCategoryList(response.data)
        })
    }
    const getDishByCategories = (categories) => {
        Axios.get(`http://localhost:3002/api/get/dishIsCategory/${categories}`).then((response) => {
            setDishList(response.data)
        })
    }
    const getDishByIngredients = (ingredients) => {
        Axios.get(`http://localhost:3002/api/get/dishHasIngredients/${ingredients}`).then((response) => {
            setDishList(response.data)
        })
    }
    const deleteDish = (dishId) => {
        Axios.delete(`http://localhost:3002/api/delete/dish/${dishId}`).then((response) => {
        })
    }
    const updateDish = (dishId, dishName, dishDescription, dishRecipe) => {
        Axios.put(`http://localhost:3002/api/update/dish`, {
            dish_id: dishId,
            dish_name: dishName,
            descrip: dishDescription,
            recipe: dishRecipe
        })
    }
    const insertDish = (dish, nutrients, ingredients, categories) => {
        Axios.post(`http://localhost:3002/api/insert/dish`, {
            dish_id: dish.dish_id,
            dish_name: dish.dish_name,
            descrip: dish.descrip,
            recipe: dish.recipe,
        }).then(
            Axios.post(`http://localhost:3002/api/insert/dishNutrients`, {
                nutrients: nutrients
            }),
            Axios.post(`http://localhost:3002/api/insert/dishIngredients`, {
                ingredients: ingredients
            }),
            Axios.post(`http://localhost:3002/api/insert/dishCategories`, {
                categories: categories
            })
        )
    }
    const showUndo = () => {
        return  (<button onClick={() => {
            insertDish(savedDish, savedDishNutrients, savedDishIngredients, savedDishCategories);
            setDeleteState(false);
            setDishList([savedDish]);
            setDishNutrientList(savedDishNutrients);
            setDishIngredientList(savedDishIngredients);
            setDishCategoryList(savedDishCategories)}}>Undo Delete</button>);
    }
    const showAdvancedSearch = (val) => {
      return (
        <div> 
            <p>ADVANCED SEARCH OPTIONS</p>
            <p>Search by category</p>
            <textarea name="category" rows="1" cols="50" onChange={(e) => {
                        setCategorySearchList(e.target.value);
                    } }></textarea>
            <br/>
            <button onClick={() => {setDishNutrientList([]); setDishIngredientList([]); setDishCategoryList([]); getDishByCategories(categorySearchList); setAdvancedSearchState(false);}}>Search</button>
            <p>Search by ingredients</p>
            <textarea name="ingredient" rows="1" cols="50" onChange={(e) => {
                        setIngredientSearchList(e.target.value);
                    } }></textarea>
            <br/>
            <button onClick={() => {setDishNutrientList([]); setDishIngredientList([]); setDishCategoryList([]); getDishByIngredients(ingredientSearchList); setAdvancedSearchState(false);}}>Search</button>
            <br/>
            <br/>
            <button onClick={() => {setAdvancedSearchState(false);}}>Cancel</button>
         </div>
        );
    }

    const showForm = (val) => {
      return (
        <div> 
                    <textarea name="dishName" rows="1" cols="50" onChange={(e) => {
                      setDishName(e.target.value)
                    } }>{val.dish_name}</textarea>
                    <br/>
                    <textarea name="dishDescription" rows="10" cols="50" onChange={(e) => {
                      setDishDescription(e.target.value)
                    } }>{val.descrip}</textarea>
                    <textarea name="dishRecipe" rows="10" cols="50" onChange={(e) => {
                      setDishRecipe(e.target.value)
                    } }>{val.recipe}</textarea>
                    <br/>
                    <button onClick={() => {
                        updateDish(val.dish_id, dishName, dishDescription, dishRecipe);
                        setDishList([{dish_id: val.dish_id,
                                        dish_name: dishName, 
                                        descrip: dishDescription,
                                        recipe: dishRecipe}]);
                        setState(false);}}>Submit</button>
                  <button onClick={() => {setState(false)}}>Cancel</button>
         </div>
        );
    }
    const showIngredients  = () => {
        return(
                <div>
                <h3>Ingredients</h3>
                    <ul>
                    {dishIngredientList.map((val) => {
                        if (val.unit === "unit") {
                            return (
                                <li>{val.amount} {val.ingredient_name}</li>
                            );
                        } else {
                            return (
                                <li>{val.amount} {val.unit} {val.ingredient_name}</li>
                            );
                        }
                    })}
                    </ul>
                </div>
        );
    }
    const showLabels  = () => {
        return(
                <div>
                <h3>Labels</h3>
                    <ul>
                    {dishCategoryList.map((val) => {
                            return (
                                <li>{val.category}</li>
                            );
                    })}
                    </ul>
                </div>
        );
    }
    const showNutrients = () => {
        return(
            <div>
                <h3>Nutrients</h3>
                    <ul>
                    {dishNutrientList.map((val) => {
                        if (val.nutrient_name === "sodium") {
                            return (
                                <li>{val.amount}mg {val.nutrient_name}</li>
                            );
                        } else if (val.nutrient_name === "calories") {
                            return (
                                <li>{val.amount} {val.nutrient_name}</li>
                            );

                        } else {
                            return (
                                <li>{val.amount}g {val.nutrient_name}</li>
                            );

                        }
                    })}
                    </ul>
                </div>
        );
    }
    const showUpdateDelete = (val) => {
        return (
            <div>
                  <button onClick={() => {
                    setDeleteState(true);
                    setDishList([]);
                    deleteDish(val.dish_id);
                    setSavedDishNutrients(dishNutrientList);
                    setSavedDishCategories(dishCategoryList);
                    setSavedDishIngredients(dishIngredientList);
                    setSavedDish({dish_id : val.dish_id,
                                    dish_name : val.dish_name,
                                    descrip : val.descrip,
                                    recipe : val.recipe});}}> Delete Dish</button>
                  <button  onClick={() => {setState(true);
                            setDishName(val.dish_name);
                            setDishDescription(val.descrip);
                            setDishRecipe(val.recipe);
                    } }>Update Dish</button>
            </div>
        );
    }
    return (
        <div>
            <h1> Dish Page</h1>
            <label> Dish ID:</label>
            <input type="text" name="dishId" onChange={(e) => {
              setDishId(e.target.value)
            } }/>
            {advanceSearchState ? null : <button onClick={() => {getDish(dishId); setState(false)}}> Search</button>}
            <button onClick={() => {setAdvancedSearchState(true)}}> Show Advanced Search</button>
            {advanceSearchState ? showAdvancedSearch(): null}
            {deleteState ? showUndo(): null}
            {dishList.map((val) => {
              return (
                <div>
                    <h2>{val.dish_name} </h2>
                    <p> Description: {val.descrip}</p>
                    <p> Recipe: {val.recipe}</p>
                    {dishCategoryList.length == 0 ? null : showLabels()}    
                    {dishIngredientList.length == 0 ? null : showIngredients()}
                    {dishNutrientList.length == 0 ? null : showNutrients()}
                    {dishIngredientList.length == 0 ? null : showUpdateDelete(val)}                
                  {state ? showForm(val) : null}
                </div>
              );
            })}
        </div>
    );
}
 
export default Dish;
