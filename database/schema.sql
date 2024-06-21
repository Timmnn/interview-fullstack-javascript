CREATE TABLE cities (
    id TEXT PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    cityName VARCHAR(255) NOT NULL,
    count INT NOT NULL DEFAULT 0
);

