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
app.get("/api/get/dishHasIngredients/:ingredients", (require, response) => {
    const ingredients = require.params.ingredients;
    var arr = ingredients.split(" ");
    var ingredientA = "%" + arr[0] + "%";
    var ingredientB = "%" + arr[1] + "%";
    const sqlSelect = "SELECT dish_name, descrip, recipe FROM dishes d LEFT JOIN requires r on d.dish_id=r.dish_id LEFT JOIN ingredients i on r.ingredient_id = i.ingredient_id WHERE ingredient_name LIKE ? UNION SELECT dish_name, descrip, recipe FROM dishes d LEFT JOIN requires r on d.dish_id=r.dish_id LEFT JOIN ingredients i on r.ingredient_id = i.ingredient_id WHERE ingredient_name = ?";
    db.query(sqlSelect, [ingredientA, ingredientB], (err, result) => {
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
        console.log("delete");
        console.log(result);
        if (err)
        console.log(err);
    })
})

app.post("/api/insert/dish", (require, response) => {
    const dish_id = require.body.dish_id;
    const dish_name = require.body.dish_name;
    const descrip = require.body.descrip;
    const recipe = require.body.recipe;
    console.log(require.body);

    const sqlInsert = "INSERT INTO `dishes` VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [dish_id, dish_name, recipe, descrip], (err, result) => {
        console.log("insert");
        console.log(result);
        if (err)
        console.log(err);
    })
})
app.post("/api/insert/dishNutrients", (require, response) => {
    const nutrients = require.body.nutrients;
    const nutrientList = nutrients.map((val) => [val.dish_id, val.nutrient_id, val.amount]);
    console.log(nutrientList);

    const sqlInsert = "INSERT INTO `dish_contains` VALUES ?";
    db.query(sqlInsert, [nutrientList], (err, result) => {
        console.log("nutrients");
        console.log(result);
        if (err)
        console.log(err);
    })
})
app.post("/api/insert/dishIngredients", (require, response) => {
    //const dish_id = require.body.dish_id;
    //const ingredient_id = require.body.ingredient_id;
    //const amount = require.body.amount;
    //const unit = require.body.unit;
    const ingredients = require.body.ingredients;
    const ingredientList = ingredients.map((val) => [val.dish_id, val.ingredient_id, val.amount, val.unit])
    console.log(ingredientList);

    const sqlInsert = "INSERT INTO `requires` VALUES ?";
    db.query(sqlInsert, [ingredientList], (err, result) => {
        console.log("ingredients");
        console.log(result);
        if (err)
        console.log(err);
    })
})
app.post("/api/insert/dishCategories", (require, response) => {
    const categories = require.body.categories;
    const categoriesList = categories.map((val) => [val.dish_id, val.dietary_id])
    console.log(categoriesList);

    const sqlInsert = "INSERT INTO `dish_dietary_category` VALUES ?";
    db.query(sqlInsert, [categoriesList], (err, result) => {
        console.log("category");
        console.log(result);
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
        console.log("get");
        response.send(result);
    });
});

app.post("/api/insert/UDP", (require, response) => {
    const user_id = require.body.user_id;
    const dietary_id = require.body.dietary_id;

    const sqlInsert = "INSERT INTO `user_dietary_preference` VALUES (?, ?)";
    db.query(sqlInsert, [user_id, dietary_id], (err, result) => {
        console.log("insert");
        if (err)
        console.log(err);
    })
})

app.put("/api/update/UDP", (require, response) => {
    const user_id = require.body.user_id;
    const dietary_id = require.body.dietary_id;

    const sqlUpdate = "UPDATE `user_dietary_preference` SET `dietary_id` = ? WHERE `user_id` = ?";
    db.query(sqlUpdate, [dietary_id, user_id], (err, result) => {
        console.log("update");
        if (err)
        console.log(err);
    })
})

app.delete("/api/delete/UDP/:user_id", (require, response) => {
    const user_id = require.params.user_id

    const sqlDelete = "DELETE FROM `user_dietary_preference` WHERE `user_id` = ?";
    db.query(sqlDelete, user_id, (err, result) => {
        console.log("delete");
        if (err)
        console.log(err);
    })
})

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
