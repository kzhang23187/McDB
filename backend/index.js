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

//Dish API endpoints
app.get("/api/get/dish/:dishId", (require, response) => {
    const dishId = require.params.dishId;
    const sqlSelect = "SELECT * FROM `dishes` WHERE `dish_id`= ?";
    db.query(sqlSelect, [dishId], (err, result) => {
        response.send(result);
    });
});
app.get("/api/get/dishIngredients/:dishId", (require, response) => {
    const dishId = require.params.dishId;
    const sqlSelect = "SELECT * FROM requires r LEFT JOIN ingredients i on r.ingredient_id = i.ingredient_id  WHERE r.dish_id= ?";
    db.query(sqlSelect, [dishId], (err, result) => {
        if (err) {console.log(err);}
        response.send(result);
    });
});
app.get("/api/get/dishNutrients/:dishId", (require, response) => {
    const dishId = require.params.dishId;
    const sqlSelect = "SELECT * FROM dish_contains d LEFT JOIN nutrients n on d.nutrient_id = n.nutrient_id  WHERE d.dish_id= ?";
    db.query(sqlSelect, [dishId], (err, result) => {
        if (err) {console.log(err);}
        response.send(result);
    });
});
app.get("/api/get/dishCategory/:dishId", (require, response) => {
    const dishId = require.params.dishId;
    const sqlSelect = "SELECT * FROM dish_dietary_category d LEFT JOIN dietary_category c on d.dietary_id = c.dietary_id  WHERE d.dish_id= ?";
    db.query(sqlSelect, [dishId], (err, result) => {
        if (err) {console.log(err);}
        response.send(result);
    });
});

app.put("/api/update/dish", (require, response) => {
    const dish_id = require.body.dish_id;
    const dish_name = require.body.dish_name;
    const descrip = require.body.descrip;
    const recipe = require.body.recipe;

    const sqlUpdate = "UPDATE `dishes` SET `dish_name` = ?, `descrip` = ?, `recipe` = ? WHERE `dish_id` = ?";
    db.query(sqlUpdate, [dish_name, descrip, recipe, dish_id], (err, result) => {
        if (err)
        console.log(err);
    })
})

app.delete("/api/delete/dish/:dishId", (require, response) => {
    const dishId = require.params.dishId;
    const sqlDelete = "DELETE FROM `dishes` WHERE `dish_id` = ?";
    db.query(sqlDelete, dishId, (err, result) => {
        if (err)
        console.log(err);
    })
})

app.post("/api/insert/dish", (require, response) => {
    const dish_id = require.body.dish_id;
    const dish_name = require.body.dish_name;
    const descrip = require.body.descrip;
    const recipe = require.body.recipe;

    const sqlInsert = "INSERT INTO `dishes` VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [dish_id, dish_name, recipe, descrip], (err, result) => {
        if (err)
        console.log(err);
    })
})
app.post("/api/insert/dishNutrients", (require, response) => {
    const dish_id = require.body.dish_id;
    const nutrient_id = require.body.nutrient_id;
    const amount = require.body.amount;

    const sqlInsert = "INSERT INTO `dish_contains` VALUES (?, ?, ?)";
    db.query(sqlInsert, [dish_id, nutrient_id, amount], (err, result) => {
        if (err)
        console.log(err);
    })
})
app.post("/api/insert/dishIngredients", (require, response) => {
    const dish_id = require.body.dish_id;
    const ingredient_id = require.body.ingredient_id;
    const amount = require.body.amount;
    const unit = require.body.unit;

    const sqlInsert = "INSERT INTO `requires` VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [dish_id, ingredient_id, amount, unit], (err, result) => {
        if (err)
        console.log(err);
    })
})
app.post("/api/insert/dishCategories", (require, response) => {
    const dish_id = require.body.dish_id;
    const dietary_id = require.body.dietary_id;

    const sqlInsert = "INSERT INTO `dish_dietary_category` VALUES (?, ?)";
    db.query(sqlInsert, [dish_id, dietary_id], (err, result) => {
        if (err)
        console.log(err);
    })
})




app.get("/api/get", (require, response) => {
    const sqlSelect = "SELECT * FROM nutrients";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
    });
});

//User Dietary Preference API endpoints
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

