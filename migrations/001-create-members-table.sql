-- Up
CREATE TABLE members (
  id INTEGER PRIMARY KEY,
  name VARCHAR(50),
  nickname VARCHAR(60),
  email TEXT,
  image VARCHAR(255)
);

-- Down
DROP TABLE members;
