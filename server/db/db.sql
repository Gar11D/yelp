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