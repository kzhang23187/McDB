import '../App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
 
const Dish = () => {
    const [state, setState] = useState(false);
    const [dishList, setDishList] = useState([]);
    const [dishId, setDishId] = useState("");
    const [dishName, setDishName] = useState("");
    const [dishDescription, setDishDescription] = useState("");
    const [dishRecipe, setDishRecipe] = useState("");
    const getDish = (dishId) => {
        Axios.get(`http://localhost:3002/api/get/dish/${dishId}`).then((response) => {
          setDishList(response.data)
        })
    }
    const deleteDish = (dishId) => {
        Axios.delete(`http://localhost:3002/api/delete/dish/${dishId}`).then((response) => {
          setDishList([])
        })
    }
    const updateDish = (dishId, dishName, dishDescription, dishRecipe) => {
        Axios.put(`http://localhost:3002/api/update/dish`, {
            dish_id: dishId,
            dish_name: dishName,
            dish_descrip: dishDescription,
            dish_recipe: dishRecipe
        })
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
                                        recipe: dishRecipe}]); }}>Submit</button>
                  <button onClick={() => {setState(false)}}>Cancel</button>
         </div>
        );
    }
    return (
        <div className="App">
            <h1> Dish Page</h1>
            <h2> Get Dish Info </h2>
            <label> Dish Id:</label>
            <input type="text" name="dishId" onChange={(e) => {
              setDishId(e.target.value)
            } }/>
            <button onClick={() => {getDish(dishId)}}> Get Dish</button>
            {dishList.map((val) => {
              return (
                <div>
                  <h1>{val.dish_name} </h1>
                  <p> Description: {val.descrip}</p>
                  <p> Recipe: {val.recipe}</p>
                  <button onClick={() => {deleteDish(dishId)}}> Delete Dish</button>
                  <button  onClick={() => {setState(true)} }>Update Dish</button>
                  {state ? showForm(val) : null}
                </div>
              );
            })}
            <h2> Add New Dish </h2>
        </div>
    );
}
 
export default Dish;
