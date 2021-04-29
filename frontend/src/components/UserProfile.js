import '../App.css';
import React, {useState} from "react";
import Axios from 'axios';

 
const UserProfile = () => {
   const [userIdList, setUserList] = useState([]);
   const [user_id, setUserID] = useState("");
   const [first_name, setFN] = useState("");
   const [last_name, setLN] = useState("");
   const [age, setAge] = useState("");
   const [height, setHeight] = useState("");
   const [weight, setWeight] = useState("");

   const getUser = (user_id) => {
      Axios.get(`http://localhost:3002/api/get/user/${user_id}`).then((response) => {
         setUserList(response.data)
      })
   };


   const insertUser = (user_id, first_name, last_name, age, height, weight) => {
      Axios.post(`http://localhost:3002/api/insert/user`, {
         user_id: user_id,
         first_name: first_name,
         last_name: last_name,
         age: age,
         height: height,
         weight: weight
      })
   };

   const updatePreference = (user_id, first_name, last_name, age, height, weight) => {
      Axios.put(`http://localhost:3002/api/update/user`, {
         user_id: user_id,
         first_name: first_name,
         last_name: last_name,
         age: age,
         height: height,
         weight: weight
      })
   };

   const deletePref = (user_id) => {
      Axios.delete(`http://localhost:3002/api/delete/user/${user_id}`);

   };
    return (
       <div className="App">
         <h1>User</h1>
         <p>This is where you do CRUD operations on User table</p>
         <h1> CRUD APPLICATIONS</h1>
         <h1>Current user id: {user_id}</h1>

            <div className="form">
                <label> Insert user id:</label>
                <input type="text" name="user_id" onChange={(e) => {
                    setUserID(e.target.value)
                 } }/>
                 <label> Insert first name:</label>
                <input type="text" name="first_name" onChange={(e) => {
                    setFN(e.target.value)
                 } }/>
                 <label> Insert last name:</label>
                <input type="text" name="last_name" onChange={(e) => {
                    setLN(e.target.value)
                 } }/>
                 <label> Insert age:</label>
                <input type="text" name="last_name" onChange={(e) => {
                    setAge(e.target.value)
                 } }/>
                 <label> Insert weight:</label>
                <input type="text" name="last_name" onChange={(e) => {
                    setWeight(e.target.value)
                 } }/>
                 <label> Insert height:</label>
                <input type="text" name="last_name" onChange={(e) => {
                    setHeight(e.target.value)
                 } }/>
                
            </div>
            <button onClick={() => {getUser(user_id)}}> Get User </button>
            <button onClick={() => {insertUser(user_id, first_name, last_name, age, height, weight)}}> Insert User Details </button>
            <button onClick={() => {updatePreference(user_id, first_name, last_name, age, height, weight)}}> Update User Details </button>
            <button onClick={() => {deletePref(user_id)}}> Delete User</button>
            {userIdList.map((val) => {
              return (
                <div className = "card">
                  <h1> user_id: {val.user_id} </h1>
                  <p> first name: {val.first_name} </p>
                  <p> last name: {val.last_name} </p>
                  <p> age: {val.age}, height: {val.height}, weight: {val.weight}</p>
            
                </div>
              );
            })}
       </div>
    );
}
 
export default UserProfile;
