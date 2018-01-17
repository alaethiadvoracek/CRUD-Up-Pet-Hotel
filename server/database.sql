CREATE TABLE owners (
 id SERIAL PRIMARY KEY, 
 first_name VARCHAR (35) NOT NULL,
 last_name VARCHAR (35) NOT NULL
);
DROP TABLE owners;

INSERT INTO owners (first_name, last_name)
VALUES ('Ian', 'Robertson');

CREATE TABLE visits (
 id SERIAL PRIMARY KEY,
 pets_id INT REFERENCES pets, 
 check_in DATE DEFAULT now(),
 check_out DATE DEFAULT now()
);
INSERT INTO visits(pets_id, check_in, check_out)
VALUES (1, '1/1/2018', '1/1/2018');

DROP TABLE visits;

CREATE TABLE pets (
 id SERIAL PRIMARY KEY, 
 owners_id INT REFERENCES owners,
 name VARCHAR (100) NOT NULL,
 breed VARCHAR (50), 
 color VARCHAR (25)
);

DROP TABLE pets;

INSERT INTO pets(owners_id, name, breed, color)
VALUES (1, 'santana', 'german Shepherd', 'black');

