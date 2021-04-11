const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


var db = mysql.createConnection({
    host:'34.68.116.112',
    user: 'root',
    password:'12345',
    database:'mcdb',
})

// db.connect(function(err) {
//     if (err) throw err;
//     var sql = "INSERT INTO `movie_reviews` (`id`,`movieName`, `movieReview`) VALUES (5,'inception', 'good movie');";
//     db.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result.affectedRows + " record(s) updated");
//     });
//   });

// app.get('/', (require, response) => {
//     const sqlInsert = "INSERT INTO `movie_reviews` (`movieName`, `movieReview`) VALUES ('Spider2', 'good movie');";
//     db.query(sqlInsert, (err, result) => {
//         response.send("Hello world!!!");
//     })
// })

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/get", (require, response) => {
    const sqlSelect = "SELECT * FROM nutrients";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
    });
});

app.post("/api/insert", (require, response) => {
    const movieName = require.body.movieName;
    const movieReview = require.body.movieReview;

    const sqlInsert = "INSERT INTO `movie_reviews` (`movieName`, `movieReview`) VALUES (?,?)";
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(err);
    })
});

app.delete("/api/delete/:movieName", (require, response) => {
    const movieName = require.params.movieName;

    const sqlDelete = "DELETE FROM `movie_reviews` WHERE `movieName`= ?";
    db.query(sqlDelete, movieName, (err, result) => {
        if (err)
        console.log(err);
    })
});

app.put("/api/update/", (require, response) => {
    const movieName = require.body.movieName;
    const movieReview = require.body.movieReview;

    const sqlUpdate = "UPDATE `movie_reviews` SET `movieReview` = ? WHERE `movieName`= ?";
    db.query(sqlUpdate, [movieReview,movieName ], (err, result) => {
        if (err)
        console.log(error);
    })
});

//selected meals stuff
app.get("/api/get/selectedmeals", (require, response) => {
    const sqlSelect = "SELECT * FROM selected_dishes";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
    });
});
//selected meals stuff end

app.listen(3002, () => {
    console.log("running on port 3002");
})
