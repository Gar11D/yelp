require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const morgan = require('morgan');
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try{
        // const results = await db.query("SELECT * FROM restaurants");
        const restaurantRatingsData = await db.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id;");
        res.status(200).json({
            status: "success",
            results: restaurantRatingsData.rows.length,
            data: {
                restaurant: restaurantRatingsData.rows
            }
        });
    }
    catch(err){console.log(err)};

});
//http://localhost:3000/api/v1/restaurants

//Get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    console.log(req.params.id);

    try{
        const restaurants = await db.query(
            "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE ID = $1", 
            [req.params.id]
        );
        const reviews = await db.query(
            "SELECT * FROM reviews WHERE restaurant_id = $1", 
            [req.params.id]
        );
        // console.log(results.rows[0]); 
        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurants.rows[0],
                reviews: reviews.rows
            }
        });
    }
    catch(err){
        console.log(err);
    };
});

//Create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req.body);

    try{
        const results = await db.query(
            "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
            [req.body.name, req.body.location, req.body.price_range]
            );
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        });
    } catch(err) {
        console.log(err);
    }
});

//Update a restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try{
        const results = await db.query(
            "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
            [req.body.name, req.body.location, req.body.price_range, req.params.id]
            );

        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        });
        console.log(results);
    } catch(err) {
        console.log(err);
    }
    console.log(req.params.id);
    console.log(req.body);

});

//Delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try{
        const results = await db.query (
            "DELETE FROM restaurants WHERE id = $1", 
            [req.params.id]
        );
        res.status(204).json({
            status: "success"
        });
    } catch(err) {
        console.log(err);
    }
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try{
        const newReview = await db.query(
            "INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *",
            [req.params.id, req.body.name, req.body.review, req.body.rating]
        );
        res.status(201).json({
            status: "success",
            data: {
                review: newReview.rows[0]
            }
        })
    }
    catch(err) {
        console.log(err)
    }
}) 

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});