import '../App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
 
const Home = () => {
    const [nutrientList, setNutrientList] = useState([]);
    const getNutrients = () => {
        Axios.get('http://localhost:3002/api/get').then((response) => {
          setNutrientList(response.data)
        })
    }
    return (
        <div className="App">
            <h1> CRUD APPLICATIONS</h1>
            <button onClick={getNutrients}> Get </button>
            {nutrientList.map((val) => {
              return (
                <div className = "card">
                  <h1> Nutrient: {val.nutrient_name} </h1>
                  <p> About: {val.nutrient_description}</p>
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
