import '../App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

const Meals = () => {
    const [selectedDishes, setSelectedDishes] = useState([]);
    const [user_id, setUserID] = useState("");
    // const [meal_date, setMealDate] = useState("");

    const filterByUserId = (user_id) => {
      Axios.get(`http://localhost:3002/api/get/selectedmeals/${user_id}`).then((response) => {
          setSelectedDishes(response.data)
        })
    }

    // const filterByMealDate = (meal_date) => {
    //   Axios.get(`http://localhost:3002/api/get/selectedmeals/${meal_date}`).then((response) => {
    //       setSelectedDishes(response.data)
    //     })
    // }

    return (
        <div className="App">
            <h1> Selected Meals</h1>

            <div className="form">
                <label> To filter by user id, please enter the id below:</label>
                <input type="text" name="user_id" onChange={(e) => {
                    setUserID(e.target.value)
                 }}/>
            </div>
            <button onClick={()=>{filterByUserId(user_id)}}> View Meal History by User </button>
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
    );
}

export default Meals;
