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

app.get("/api/get/dish/:dishId", (require, response) => {
    const dishId = require.params.dishId;
    const sqlSelect = "SELECT * FROM `dishes` WHERE `dish_id`= ?";
    db.query(sqlSelect, [dishId], (err, result) => {
        console.log(err);
        console.log(result);
        response.send(result);
    });
});

app.get("/api/get", (require, response) => {
    const sqlSelect = "SELECT * FROM nutrients";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
    });
});

app.get("/api/get/UDP/:user_id", (require, response) => {
    const user_id = require.params.user_id;

    const sqlSelect = "SELECT * FROM `user_dietary_preference` WHERE `user_id` = ?";
    db.query(sqlSelect, [user_id], (err, result) => {
        response.send(result);
    });
});

app.post("/api/insert/UDP", (require, response) => {
    const user_id = require.body.user_id;
    const dietary_id = require.body.dietary_id;

    const sqlInsert = "INSERT INTO `user_dietary_preference` VALUES (?, ?)";
    db.query(sqlInsert, [user_id, dietary_id], (err, result) => {
        console.log(err);
        console.log(response);
    })
})

app.put("api/update/UDP", (require, response) => {
    const user_id = require.body.user_id;
    const dietary_id = require.body.dietary_id;

    const sqlUpdate = "UPDATE `user_dietary_preference` SET `dietary_id` = ? WHERE `user_id` = ?";
    db.query(sqlUpdate, [dietary_id, user_id], (err, result) => {
        if (err)
        console.log(err);
    })
})

app.delete("api/delete/:user_id", (require, response) => {
    const user_id = require.params.user_id

    const sqlDelete = "DELETE FROM `user_dietary_preference` WHERE `user_id` = ?";
    db.query(sqlDelete, user_id, (err, result) => {
        if (err)
        console.log(err);
    })
})

app.listen(3002, () => {
    console.log("running on port 3002");
})

