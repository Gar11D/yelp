CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >= 1 and rating <= 5)
);

INSERT INTO reviews (restaurant_id, name, review, rating) 
VALUES (4, 'john', 'food was great', 5);

INSERT INTO reviews (restaurant_id, name, review, rating) 
VALUES (4, 'tim', 'good place', 4);

INSERT INTO reviews (restaurant_id, name, review, rating) 
VALUES (4, 'rachel', 'ok vibe', 3);

INSERT INTO reviews (restaurant_id, name, review, rating) 
VALUES (1, 'queen', 'food was fantastic', 5);

INSERT INTO reviews (restaurant_id, name, review, rating) 
VALUES (1, 'king', 'nice place', 4);

INSERT INTO reviews (restaurant_id, name, review, rating) 
VALUES (1, 'lisa', 'its fine', 3);

SELECT TRUNC(AVG(rating), 2) AS average_rating FROM reviews WHERE restaurant_id = 6;
SELECT COUNT(rating) FROM reviews WHERE restaurant_id = 6;

SELECT location, COUNT(location) FROM restaurants GROUP BY location;

SELECT * FROM restaurants INNER JOIN reviews ON restaurants.id = reviews.restaurant_id;
SELECT * FROM restaurants LEFT JOIN reviews ON restaurants.id = reviews.restaurant_id;
SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) as average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id;