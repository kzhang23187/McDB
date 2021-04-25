import '../App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

var username;
const Home = (props) => {
    if (username == null) {
        username = props.location.state.username;
    }
    const [nutrientList, setNutrientList] = useState([]);
    useEffect(() => {
        Axios.get(`http://localhost:3002/api/get/macroValues/${username}`).then((response) => {
          setNutrientList(response.data)
        })
    },[])
    
    return (
        <div className="App">
            <h1> Welcome, {username}</h1>
            {nutrientList.map((val) => {
              return (
                <div className = "card">
                  <h1> Nutrient: {val.nutrient_name} </h1>
                  <p> Weekly Avg: {val.amount}</p>
                </div>
              );
            })}
        </div>
//       <div>
//          <h1>Home</h1>
//           <p>Home page body content</p>
//       </div>
    );
}

export default Home;
