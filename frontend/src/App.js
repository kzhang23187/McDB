import './App.css';
import React, {Component} from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import Home from './components/Home.js';
import Dish from './components/Dish.js';
import UserProfile from './components/UserProfile.js';
import Meals from './components/Meals.js';
import Error from './components/Error.js';
import Navigation from './components/Navigation.js';
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/dish" component={Dish}/>
             <Route path="/user" component={UserProfile}/>
             <Route path="/meal" component={Meals}/>
            <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;










































//function App() {
//       // const [movieName, setMovieName] = useState('');
//       // const [Review, setReview] = useState('');
//       // const [movieReviewList, setMovieReviewList] = useState([]);
//       // const [newReview, setNewReview] = useState("");
//        const [nutrientList, setNutrientList] = useState([]);
//
//    
//     // useEffect(() => {
//     //   Axios.get('http://localhost:3002/api/get').then((response) => {
//     //     setMovieReviewList(response.data)
//     //   })
//     // },[])
//    const getNutrients = () => {
//        Axios.get('http://localhost:3002/api/get').then((response) => {
//          setNutrientList(response.data)
//        })
//    }
//     // const submitReview = () => { 
//     //   Axios.post('http://localhost:3002/api/insert', {
//     //     movieName: movieName,
//     //     movieReview: Review
//     //   });
//     //   
//     //   setMovieReviewList([
//     //     ...movieReviewList,
//     //     {
//     //       movieName: movieName,
//     //       movieReview: Review
//     //     },
//     //   ]);
//     // };
//
//     // const deleteReview = (movieName) => {
//     //   Axios.delete(`http://localhost:3002/api/delete/${movieName}`);
//     // };
//
//     // const updateReview = (movieName) => {
//     //   Axios.put(`http://localhost:3002/api/update`, {
//     //     movieName: movieName,
//     //     movieReview: newReview
//     //   });
//     //   setNewReview("")
//     // };
//
//      return (
//        <div className="App">
//            <h1> CRUD APPLICATIONS</h1>
//            <button onClick={getNutrients}> Get </button>
//            {nutrientList.map((val) => {
//              return (
//                <div className = "card">
//                  <h1> Nutrient: {val.nutrient_name} </h1>
//                  <p> About: {val.nutrient_description}</p>
//                </div>
//              );
//            })}
//        </div>
//         // <div className="form">
//         //   <label> Movie Name:</label>
//         //   <input type="text" name="movieName" onChange={(e) => {
//         //     setMovieName(e.target.value)
//         //   } }/>
//         //   <label> Review:</label>
//         //   <input type="text" name="Review" onChange={(e) => {
//         //     setReview(e.target.value)
//         //   }}/>
//         //   
//         //   <button onClick={submitReview}> Submit</button>
//
//         //   {movieReviewList.map((val) => {
//         //     return (
//         //       <div className = "card">
//         //         <h1> MovieName: {val.movieName} </h1>
//         //         <p>Movie Review: {val.movieReview}</p>
//         //         <button onClick={() => { deleteReview(val.movieName) }}> Delete</button>
//         //         <input type="text" id="updateInput" onChange={(e) => {
//         //           setNewReview(e.target.value)
//         //         } }/>
//         //         <button onClick={() => {
//         //           updateReview(val.movieName)
//         //         }}> Update</button>
//         //         </div>
//         //     );
//         //     
//         //   })}
//         //   
//
//         // </div>
//          
//        //</div>
//      );
//}
//
//export default App;
