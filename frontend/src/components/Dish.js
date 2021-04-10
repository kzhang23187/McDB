import '../App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
 
const Dish = () => {
    const [dishList, setDishList] = useState([]);
    const [dishId, setDishId] = useState("");
    const getDish = (dishId) => {
        Axios.get(`http://localhost:3002/api/get/dish/${dishId}`).then((response) => {
          setDishList(response.data)
        })
    }
    return (
        <div className="App">
            <h1> CRUD APPLICATIONS</h1>
            <label> Dish Name:</label>
            <input type="text" name="dishName" onChange={(e) => {
              setDishId(e.target.value)
            } }/>
            <button onClick={() => {getDish(dishId)}}> Get Dish</button>
            {dishList.map((val) => {
              return (
                <div>
                  <h1> Dish: {val.dish_name} </h1>
                  <p> Description: {val.descrip}</p>
                  <p> Recipe: {val.recipe}</p>
                </div>
              );
            })}
        </div>
    );
}
 
export default Dish;
