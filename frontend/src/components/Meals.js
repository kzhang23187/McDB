import '../App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

const Meals = () => {
    const [selectedDishes, setSelectedDishes] = useState([]);
    const [user_id, setUserID] = useState("");
    const [dish_id, setDishId] = useState("");
    const [meal_date, setMealDate] = useState("");
    const [meal_type, setMealType] = useState("");

    const filterByUserId = (user_id) => {
      Axios.get(`http://localhost:3002/api/get/selectedmeals/userid/${user_id}`).then((response) => {
          setSelectedDishes(response.data)
        })
    }
    const filterByMealDate = (meal_date) => {
      Axios.get(`http://localhost:3002/api/get/selectedmeals/date/${meal_date}`).then((response) => {
          setSelectedDishes(response.data)
        })
    }
    const insertSelectedDish = () => {
      Axios.post(`http://localhost:3002/api/insert/selectedmeals`,{
        user_id: user_id,
        dish_id: dish_id,
        meal_date: meal_date,
        meal_type: meal_type
      })
    }

    return (
        <div className="App">
            <h1> View Selected Meals:</h1>

            <div className="form">
                <label> To filter by user id, please enter the id below:</label>
                <input type="text" name="user_id" onChange={(e) => {
                    setUserID(e.target.value)
                 }}/>
                 <label> To filter by meal date, please enter the meal date below:</label>
                 <input type="text" name="meal_date" onChange={(e) => {
                   setMealDate(e.target.value)
                  }}/>
            </div>
            <button onClick={()=>{filterByUserId(user_id)}}> View Meal History by User </button>
            <button onClick={()=>{filterByMealDate(meal_date)}}> View Meal History by Meal Date </button>
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


            <h1> Insert a dish into Selected Meals:</h1>
            <div className="form">
                <label> User id for user that this dish should be attributed to:</label>
                <input type="text" name="user_id" onChange={(e) => {
                    setUserID(e.target.value)
                 }}/>
                 <label> Dish id of the dish:</label>
                 <input type="text" name="dish_id" onChange={(e) => {
                   setDishId(e.target.value)
                 }}/>
                 <label> Date of the meal (YYYY-MM-DD):</label>
                 <input type="text" name="meal_date" onChange={(e) => {
                    setMealDate(e.target.value)
                  }}/>
                  <label> Type of meal (breakfast, lunch, dinner, snack):</label>
                  <input type="text" name="meal_type" onChange={(e) => {
                     setMealType(e.target.value)
                  }}/>
            </div>
            <button onClick={()=>{insertSelectedDish(user_id, dish_id, meal_date, meal_type)}}> Insert dish </button>
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
