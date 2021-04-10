import '../App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
 
const UserDietaryPreferences = () => {
    const [userIdList, setUserList] = useState([]);
    const [user_id, setUserID] = useState("");

    const getUserPref = (user_id) => {
        Axios.get(`http://localhost:3002/api/get/UDP/${user_id}`).then((response) => {
            setUserList(response.data)
        })
    }
    return (
        <div className="App">
            <h1> CRUD APPLICATIONS</h1>
            <label> User ID:</label>
            <input type="text" name="userID" onChange={(e) => {
                setUserID(e.target.value)
            } }/>
           
            <button onClick={() => {getUserPref(user_id)}}> Get </button>
            {userIdList.map((val) => {
              return (
                <div className = "card">
                  <h1> user_id: {val.user_id} </h1>
                  <p> dietary_id: {val.dietary_id}</p>
                </div>
              );
            })}
        </div>
    );
}
 
export default UserDietaryPreferences;
