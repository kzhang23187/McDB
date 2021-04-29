import '../App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

const Meals = () => {
    const [selectedDishes, setSelectedDishes] = useState([]);
    const [user_id, setUserID] = useState("");
    const [dish_id, setDishId] = useState("");
    const [meal_date, setMealDate] = useState("");
    const [meal_type, setMealType] = useState("");
    const [postAction, setPostAction] = useState(false);
    const [postUpdate, setPostUpdate] = useState(false);

    const filterByUserId = (user_id) => {
      Axios.get(`https://workshop1-307117.uc.r.appspot.com/api/get/selectedmeals/userid/${user_id}`).then((response) => {
          setSelectedDishes(response.data)
        })
    }
    const filterByMealDate = (meal_date) => {
      Axios.get(`https://workshop1-307117.uc.r.appspot.com/api/get/selectedmeals/date/${meal_date}`).then((response) => {
          setSelectedDishes(response.data)
        })
    }
    const insertSelectedDish = (user_id, dish_id, meal_date, meal_type) => {
      Axios.post(`https://workshop1-307117.uc.r.appspot.com/api/insert/selectedmeals`,{
        user_id: user_id,
        dish_id: dish_id,
        meal_date: meal_date,
        meal_type: meal_type
      })
    }
    const deleteSelectedDish = (user_id, dish_id, meal_date, meal_type) => {
      var data = user_id+ " " + dish_id + " " + meal_date + " " + meal_type;
      Axios.delete(`https://workshop1-307117.uc.r.appspot.com/api/delete/selectedmeals/${data}`,{
        user_id: user_id,
        dish_id: dish_id,
        meal_date: meal_date,
        meal_type: meal_type
      })
    }

    const updateSelectedDish = (dish_id, user_id, meal_date, meal_type) => {
        var datum = dish_id + " " + user_id + " " + meal_date + " " + meal_type;
        Axios.put(`https://workshop1-307117.uc.r.appspot.com/api/update/selectedmeals/${datum}`, {
            dish_id: dish_id,
            user_id: user_id,
            meal_date: meal_date,
            meal_type: meal_type
        })
    };

    return (
        <div className="App">

        <h1> Insert/delete a dish into Selected Meals:</h1>
        <div className="form">
            <label> User id for user that this dish is attributed to:</label>
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
        <button onClick={()=>{setPostAction(true); insertSelectedDish(user_id, dish_id, meal_date, meal_type)}}> Insert dish </button>
        <button onClick={()=>{setPostAction(true); deleteSelectedDish(user_id, dish_id, meal_date, meal_type)}}> Delete dish </button>
        {postAction ? <p>Success!</p>: null}





        <h1> Update the Dish ID of a dish that is in Selected Meals:</h1>
        <div className="form">
            <label> Dish id of the updated dish:</label>
            <input type="text" name="dish_id" onChange={(e) => {
                setDishId(e.target.value)
            }}/>
            <label> User id for user that this is attributed to:</label>
            <input type="text" name="user_id" onChange={(e) => {
                setUserID(e.target.value)
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
        <button onClick={()=>{setPostUpdate(true); updateSelectedDish(user_id, dish_id, meal_date, meal_type)}}> Update dish </button>
        {postUpdate ? <p>Success!</p>: null}





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

        </div>
    );
}

export default Meals;
