import '../App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

const Meals = () => {
    const [selectedDishes, setSelectedDishes] = useState([]);
    const getSelectedDishes = () => {
        Axios.get('http://localhost:3002/api/get/selectedmeals').then((response) => {
          setSelectedDishes(response.data)
        })
    }
    return (
        <div className="App">
            <h1> CRUD APPLICATIONS claire</h1>
            <button onClick={getSelectedDishes}> View Meal History </button>
            {selectedDishes.map((val) => {
              return (
                <div className = "card">
                  <h1> Dish: {val.dish_id} </h1>
                  <p> User: {val.user_id}</p>
                  <p> Meal: {val.meal_type}</p>
                  <p> Date: {val.meal_date}</p>
                </div>
              );
            })}
        </div>
//       <div>
//          <h1>Meals</h1>
//           <p>Meals page body content</p>
//       </div>
    );
}

export default Meals;
