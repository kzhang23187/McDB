import React from 'react';
import '../App.css'
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div className='App'>
          <NavLink to="/">Home</NavLink>
       <br/>
          <NavLink to="/dish">Dish</NavLink>
       <br/>
          <NavLink to="/meal">MealPlan</NavLink>
       <br/>
          <NavLink to="/user">UserProfile</NavLink>
       </div>
    );
}
 
export default Navigation;
