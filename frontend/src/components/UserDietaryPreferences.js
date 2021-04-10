import '../App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
 
const UserDietaryPreferences = () => {
    const [userIdList, setUserList] = useState([]);
    const [user_id, setUserID] = useState("");
    const [dietary_id, setDietaryID] = useState("");

    const getUserPref = (user_id) => {
        Axios.get(`http://localhost:3002/api/get/UDP/${user_id}`).then((response) => {
            setUserList(response.data)
        })
    }

    const insertPreference = (user_id, dietary_id) => {
        Axios.post(`http://localhost:3002/api/insert/UDP`, {
            user_id: user_id,
            dietary_id: dietary_id
        })
    }

    const deletePref = (user_id) => {
        Axios.delete(`http://localhost:3002/api/delete/${user_id}`);
    }

    const updatePreference = (user_id, dietary_id) => {
        Axios.put(`http://localhost:3002/api/update/UDP`, {
            user_id: user_id,
            dietary_id: dietary_id
        })
    }


    return (
        <div className="App">
            <h1> CRUD APPLICATIONS</h1>
            <div> 
                <h1>Current user id: {user_id}</h1>
                <h2>Current dietary id: {dietary_id}</h2>
            </div>
            {/* <label> User ID:</label>
            <input type="text" name="userID" onChange={(e) => {
                setUserID(e.target.value)
            } }/> */}


            <div className="form">
                <label> Insert user id:</label>
                <input type="text" name="user_id" onChange={(e) => {
                    setUserID(e.target.value)
                 } }/>
                 <label> Insert dietary id:</label>
                <input type="text" name="dietary_id" onChange={(e) => {
                    setDietaryID(e.target.value)
                }}/>
            </div>
            <button onClick={() => {getUserPref(user_id)}}> Get </button>
            <button onClick={() => {insertPreference(user_id,dietary_id)}}> Insert </button>
            <button onClick={() => {updatePreference(user_id,dietary_id)}}> Update </button>
            <button onClick={() => {deletePref(user_id)}}> Delete </button>
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
