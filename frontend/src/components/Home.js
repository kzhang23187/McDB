import '../App.css';
import React, { useState, useEffect } from "react";
import Axios from 'axios';
import CanvasJSReact from '../canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var username;
const Home = (props) => {
    if (username == null) {
        username = props.location.state.username;
    }
    const [username_info, setUserNameInfo] = useState([]);
    const [userAmount, setUserAmount] = useState([{ amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }]);
    const [userid, setUserId] = useState('');
    const [goals, setGoals] = useState([{ amount: 0 }, { amount: 0 }, { amount: 0 }, { amount: 0 }]);
    const sod_chart = {
        title: {
            text: "Sodium"
        },
        axisY: {
            title: "Amount (g)",
            includeZero: true,
        },
        data: [{
            type: "column",
            dataPoints: [
                { label: "Weekly Avg", y: userAmount[3].amount },
                { label: "Goal", y: goals[3].amount },
            ]
        }]
    }
    const prot_chart = {
        title: {
            text: "Protein"
        },
        axisY: {
            title: "Amount (g)",
            includeZero: true,
        },
        data: [{
            type: "column",
            dataPoints: [
                { label: "Weekly Avg", y: userAmount[2].amount },
                { label: "Goal", y: goals[1].amount },
            ]
        }]
    }
    const cal_chart = {
        title: {
            text: "Calorie"
        },
        axisY: {
            title: "Amount (cal)",
            includeZero: true,
        },
        data: [{
            type: "column",
            dataPoints: [
                { label: "Weekly Avg", y: userAmount[1].amount },
                { label: "Goal", y: goals[2].amount },
            ]
        }]
    }
    const fat_chart = {
        title: {
            text: "Fat"
        },
        axisY: {
            title: "Amount (g)",
            includeZero: true,
        },
        data: [{
            type: "column",
            dataPoints: [
                { label: "Weekly Avg", y: userAmount[0].amount },
                { label: "Goal", y: goals[0].amount },
            ]
        }]
    }
    useEffect(() => {
        Axios.get(`https://workshop1-307117.uc.r.appspot.com/api/get/userId/${username}`).then((response) => {
            setUserId(response.data)
        })
    }, [])
    useEffect(() => {
        Axios.get(`https://workshop1-307117.uc.r.appspot.com/api/get/userGoal/${username}`).then((response) => {
            setGoals(response.data)
        })
    }, [])
    useEffect(() => {
        Axios.get(`https://workshop1-307117.uc.r.appspot.com/api/get/macroValues/${username}`).then((response) => {
            setUserAmount(response.data)
        })
    }, [])
    useEffect(() => {
        Axios.get(`https://workshop1-307117.uc.r.appspot.com/api/get/home/selectedmeals/${username}`).then((response) => {
            setUserNameInfo(response.data)
        })
    }, [])

    return (
        <div className="App">
            <h1> Welcome, {username}</h1>
            <div>
                {username_info.map((val) => {
                    return (
                        <div className="card">
                            <h1> Dish: {val.dish_name} </h1>
                            <p> User: {val.user_id}</p>
                            <p> Meal: {val.meal_type}</p>
                            <p> Date: {val.meal_date}</p>
                        </div>
                    );
                })}
            </div>

            <section>
                <div>
                    <CanvasJSChart options = {fat_chart}
                        /* onRef = {ref => this.chart = ref} */
                    />
                </div>
                <div>
                    <CanvasJSChart options = {cal_chart}
                        /* onRef = {ref => this.chart = ref} */
                    />
                </div>
                <div>
                    <CanvasJSChart options = {prot_chart}
                        /* onRef = {ref => this.chart = ref} */
                    />
                </div>
                <div>
                    <CanvasJSChart options = {sod_chart}
                        /* onRef = {ref => this.chart = ref} */
                    />
                </div>
            </section>



        </div>
        //       <div>
        //          <h1>Home</h1>
        //           <p>Home page body content</p>
        //       </div>
    );
}

export default Home;
