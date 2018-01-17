CREATE TABLE owners (
 id SERIAL PRIMARY KEY, 
 first_name VARCHAR (35) NOT NULL,
 last_name VARCHAR (35) NOT NULL
);

INSERT INTO owners (first_name, last_name)
VALUES ('Ian', 'Robertson');

CREATE TABLE pets (
 id SERIAL PRIMARY KEY, 
 owners_id INT REFERENCES owners,
 name VARCHAR (100) NOT NULL,
 breed VARCHAR (50), 
 color VARCHAR (25)
);


INSERT INTO pets (name, breed, color)
VALUES ('Ian', 'German Shepherd', 'black');

CREATE TABLE visits (
 id SERIAL PRIMARY KEY, 
 check_in DATE DEFAULT now(),
 check_out DATE DEFAULT now()
);


--JUNCTION TABLES
CREATE TABLE pets_visits (
	id SERIAL PRIMARY KEY,
	pet_id INT REFERENCES "pets",
	visit_id INT REFERENCES "visits"
);


