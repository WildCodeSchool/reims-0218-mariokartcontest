-- Up
CREATE TABLE Dorian (
  id INTEGER PRIMARY KEY,
  text VARCHAR(50),
);

CREATE TABLE members (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50),
  nickname VARCHAR(60),
  email TEXT,
  password VARCHAR(60),
  image VARCHAR(255)
);

-- Down
DROP TABLE members;
DROP TABLE Dorian;