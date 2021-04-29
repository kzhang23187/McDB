import '../App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
 
const UserDietaryPreferences = () => {
    const [userIdList, setUserList] = useState([]);
    const [user_id, setUserID] = useState("");
    const [dietary_id, setDietaryID] = useState("");

    const getUserPref = (user_id) => {
        Axios.get(`https://workshop1-307117.uc.r.appspot.com/api/get/UDP/${user_id}`).then((response) => {
            setUserList(response.data)
        })
    };

    const insertPreference = (user_id, dietary_id) => {
        Axios.post(`https://workshop1-307117.uc.r.appspot.com/api/insert/UDP`, {
            user_id: user_id,
            dietary_id: dietary_id
        })
    };

    const updatePreference = (user_id, dietary_id) => {
        Axios.put(`https://workshop1-307117.uc.r.appspot.com/api/update/UDP`, {
            user_id: user_id,
            dietary_id: dietary_id
        })
    };

    const deletePref = (user_id) => {
        Axios.delete(`https://workshop1-307117.uc.r.appspot.com/api/delete/UDP/${user_id}`);
    };

    return (
        <div className="App">
            <h1> CRUD APPLICATIONS</h1>
            <div> 
                <h1>Current user id: {user_id}</h1>
                <h2>Current dietary id: {dietary_id}</h2>
            </div>

            <div className="form">
                <label> Insert user id:</label>
                <input type="text" name="user_id" onChange={(e) => {
                    setUserID(e.target.value)
                 } }/>
                 <label> Insert dietary category:</label>
                <input type="text" name="dietary_id" onChange={(e) => {
                    setDietaryID(e.target.value)
                }}/>
            </div>
            <button onClick={() => {getUserPref(user_id)}}> Get </button>
            <button onClick={() => {insertPreference(user_id, dietary_id)}}> Insert </button>
            <button onClick={() => {updatePreference(user_id, dietary_id)}}> Update </button>
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
