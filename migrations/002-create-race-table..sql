-- Up
CREATE TABLE races (
  id INTEGER PRIMARY KEY,
  nameRace TEXT
);

CREATE TABLE players_has_races (
  race_id INTEGER,
  player_id INTEGER,
  position INTEGER,
  FOREIGN KEY(race_id) REFERENCES races(id),
  FOREIGN KEY(player_id) REFERENCES members(id)
);


-- Down
DROP TABLE players_has_races;
DROP TABLE races;
